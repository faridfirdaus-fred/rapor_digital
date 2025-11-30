import prisma from '../config/database.js';

export class Siswa {
  static async create(data) {
    return await prisma.siswa.create({
      data: {
        kelasId: data.kelasId,
        nisn: data.nisn,
        nama: data.nama,
        noAbsen: data.noAbsen
      }
    });
  }

  static async findAll(kelasId = null) {
    const where = kelasId ? { kelasId } : {};
    return await prisma.siswa.findMany({
      where,
      include: {
        kelas: true
      }
    });
  }

  static async findById(id) {
    return await prisma.siswa.findUnique({
      where: { id },
      include: {
        kelas: true,
        nilai: true
      }
    });
  }

  static async findByKelas(kelasId) {
    return await prisma.siswa.findMany({
      where: { kelasId },
      include: {
        nilai: true
      }
    });
  }

  static async update(id, data) {
    return await prisma.siswa.update({
      where: { id },
      data: {
        kelasId: data.kelasId,
        nisn: data.nisn,
        nama: data.nama,
        noAbsen: data.noAbsen
      }
    });
  }

  static async delete(id) {
    try {
      // Prisma will handle cascade delete automatically
      await prisma.siswa.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getNilaiSummary(siswaId) {
    const nilaiList = await prisma.nilai.findMany({
      where: { siswaId }
    });
    
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
