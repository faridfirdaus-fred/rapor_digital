import { ObjectId } from 'mongodb';

export class BobotNilai {
  static getCollection() {
    return global.db.collection('bobotnilai');
  }

  static async createOrUpdate(kelasId, data) {
    // Check if bobot already exists for this kelas
    const existing = await this.getCollection().findOne({ kelasId });
    
    if (existing) {
      const result = await this.getCollection().findOneAndUpdate(
        { kelasId },
        { 
          $set: { 
            bobotHarian: data.bobotHarian,
            bobotUas: data.bobotUas,
            updatedAt: new Date()
          }
        },
        { returnDocument: 'after' }
      );
      return result;
    } else {
      const bobot = {
        kelasId,
        bobotHarian: data.bobotHarian,
        bobotUas: data.bobotUas,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const result = await this.getCollection().insertOne(bobot);
      return { _id: result.insertedId, ...bobot };
    }
  }

  static async findByKelas(kelasId) {
    const bobot = await this.getCollection().findOne({ kelasId });
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
    const result = await this.getCollection().deleteOne({ kelasId });
    return result.deletedCount > 0;
  }
}
