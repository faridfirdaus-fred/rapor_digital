import prisma from '../config/database.js';

export class Kelas {
  static async create(data) {
    return await prisma.kelas.create({
      data: {
        nama: data.nama
      }
    });
  }

  static async findAll() {
    return await prisma.kelas.findMany({
      include: {
        _count: {
          select: { siswa: true }
        }
      }
    });
  }

  static async findById(id) {
    return await prisma.kelas.findUnique({
      where: { id },
      include: {
        siswa: true,
        bobotNilai: true
      }
    });
  }

  static async update(id, data) {
    return await prisma.kelas.update({
      where: { id },
      data: {
        nama: data.nama
      }
    });
  }

  static async delete(id) {
    try {
      // Prisma will handle cascade delete automatically
      await prisma.kelas.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async countSiswa(kelasId) {
    return await prisma.siswa.count({
      where: { kelasId }
    });
  }
}
