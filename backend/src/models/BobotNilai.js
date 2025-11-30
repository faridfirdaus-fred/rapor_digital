import prisma from '../config/database.js';

export class BobotNilai {
  static async createOrUpdate(kelasId, data) {
    // Check if bobot already exists for this kelas
    const existing = await prisma.bobotNilai.findUnique({
      where: { kelasId }
    });
    
    if (existing) {
      return await prisma.bobotNilai.update({
        where: { kelasId },
        data: {
          bobotHarian: data.bobotHarian,
          bobotUas: data.bobotUas
        }
      });
    } else {
      return await prisma.bobotNilai.create({
        data: {
          kelasId,
          bobotHarian: data.bobotHarian,
          bobotUas: data.bobotUas
        }
      });
    }
  }

  static async findByKelas(kelasId) {
    const bobot = await prisma.bobotNilai.findUnique({
      where: { kelasId }
    });
    
    if (!bobot) {
      // Return default bobot if not found
      return {
        kelasId,
        bobotHarian: 40,
        bobotUas: 60
      };
    }
    
    return bobot;
  }

  static async delete(kelasId) {
    try {
      await prisma.bobotNilai.delete({
        where: { kelasId }
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
