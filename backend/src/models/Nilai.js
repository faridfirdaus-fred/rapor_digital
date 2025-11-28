import { ObjectId } from 'mongodb';

export class Nilai {
  static getCollection() {
    return global.db.collection('nilai');
  }

  static async create(data) {
    const nilai = {
      siswaId: data.siswaId,
      kelasId: data.kelasId,
      mataPelajaran: data.mataPelajaran,
      nilaiHarian: data.nilaiHarian || [],
      uas: data.uas || 0,
      bobotHarian: data.bobotHarian || 40,
      bobotUas: data.bobotUas || 60,
      nilaiAkhir: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Calculate nilai akhir
    nilai.nilaiAkhir = this.calculateNilaiAkhir(nilai.nilaiHarian, nilai.uas, nilai.bobotHarian, nilai.bobotUas);
    
    const result = await this.getCollection().insertOne(nilai);
    return { _id: result.insertedId, ...nilai };
  }

  static calculateNilaiAkhir(nilaiHarian, uas, bobotHarian, bobotUas) {
    if (!nilaiHarian || nilaiHarian.length === 0) {
      return (uas * bobotUas) / 100;
    }
    
    const avgHarian = nilaiHarian.reduce((sum, n) => sum + n, 0) / nilaiHarian.length;
    return ((avgHarian * bobotHarian) + (uas * bobotUas)) / 100;
  }

  static async findAll(siswaId = null) {
    const filter = siswaId ? { siswaId } : {};
    return await this.getCollection().find(filter).toArray();
  }

  static async findById(id) {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async findBySiswa(siswaId) {
    return await this.getCollection().find({ siswaId }).toArray();
  }

  static async findByKelas(kelasId) {
    return await this.getCollection().find({ kelasId }).toArray();
  }

  static async update(id, data) {
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    // Recalculate nilai akhir if components changed
    if (data.nilaiHarian !== undefined || data.uas !== undefined || data.bobotHarian !== undefined || data.bobotUas !== undefined) {
      const current = await this.findById(id);
      const nilaiHarian = data.nilaiHarian !== undefined ? data.nilaiHarian : current.nilaiHarian;
      const uas = data.uas !== undefined ? data.uas : current.uas;
      const bobotHarian = data.bobotHarian !== undefined ? data.bobotHarian : current.bobotHarian;
      const bobotUas = data.bobotUas !== undefined ? data.bobotUas : current.bobotUas;
      
      updateData.nilaiAkhir = this.calculateNilaiAkhir(nilaiHarian, uas, bobotHarian, bobotUas);
    }
    
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(id) {
    const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async getSiswaRanking(kelasId) {
    // Get all nilai for the kelas
    const nilaiList = await this.findByKelas(kelasId);
    
    // Group by siswaId and calculate average
    const siswaScores = {};
    
    for (const nilai of nilaiList) {
      if (!siswaScores[nilai.siswaId]) {
        siswaScores[nilai.siswaId] = {
          siswaId: nilai.siswaId,
          totalNilai: 0,
          count: 0
        };
      }
      siswaScores[nilai.siswaId].totalNilai += nilai.nilaiAkhir;
      siswaScores[nilai.siswaId].count += 1;
    }
    
    // Calculate average and sort
    const rankings = Object.values(siswaScores)
      .map(score => ({
        siswaId: score.siswaId,
        rataRata: score.totalNilai / score.count,
        jumlahMapel: score.count
      }))
      .sort((a, b) => b.rataRata - a.rataRata);
    
    // Add ranking position
    rankings.forEach((item, index) => {
      item.ranking = index + 1;
    });
    
    return rankings;
  }

  static async getJumlahDanRataRata(siswaId) {
    const nilaiList = await this.findBySiswa(siswaId);
    
    if (nilaiList.length === 0) {
      return {
        jumlah: 0,
        rataRata: 0,
        details: []
      };
    }

    let jumlah = 0;
    const details = nilaiList.map(n => {
      jumlah += n.nilaiAkhir;
      return {
        mataPelajaran: n.mataPelajaran,
        nilaiHarian: n.nilaiHarian,
        avgHarian: n.nilaiHarian.length > 0 ? n.nilaiHarian.reduce((sum, v) => sum + v, 0) / n.nilaiHarian.length : 0,
        uas: n.uas,
        bobotHarian: n.bobotHarian,
        bobotUas: n.bobotUas,
        nilaiAkhir: n.nilaiAkhir
      };
    });

    return {
      jumlah,
      rataRata: jumlah / nilaiList.length,
      details
    };
  }
}
