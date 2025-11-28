import { ObjectId } from 'mongodb';

export class Siswa {
  static getCollection() {
    return global.db.collection('siswa');
  }

  static async create(data) {
    const siswa = {
      kelasId: data.kelasId,
      nisn: data.nisn,
      nama: data.nama,
      noAbsen: data.noAbsen,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.getCollection().insertOne(siswa);
    return { _id: result.insertedId, ...siswa };
  }

  static async findAll(kelasId = null) {
    const filter = kelasId ? { kelasId } : {};
    return await this.getCollection().find(filter).toArray();
  }

  static async findById(id) {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async findByKelas(kelasId) {
    return await this.getCollection().find({ kelasId }).toArray();
  }

  static async update(id, data) {
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...data,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return result;
  }

  static async delete(id) {
    const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount > 0) {
      // Delete related nilai
      await global.db.collection('nilai').deleteMany({ siswaId: id });
    }
    
    return result.deletedCount > 0;
  }

  static async getNilaiSummary(siswaId) {
    const nilaiList = await global.db.collection('nilai').find({ siswaId }).toArray();
    
    if (nilaiList.length === 0) {
      return {
        totalNilai: 0,
        rataRata: 0,
        jumlahNilai: 0
      };
    }

    let total = 0;
    nilaiList.forEach(n => {
      total += n.nilaiAkhir || 0;
    });

    return {
      totalNilai: total,
      rataRata: total / nilaiList.length,
      jumlahNilai: nilaiList.length
    };
  }
}
