import { ObjectId } from 'mongodb';

export class Kelas {
  static getCollection() {
    return global.db.collection('kelas');
  }

  static async create(data) {
    const kelas = {
      nama: data.nama,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.getCollection().insertOne(kelas);
    return { _id: result.insertedId, ...kelas };
  }

  static async findAll() {
    return await this.getCollection().find({}).toArray();
  }

  static async findById(id) {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
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
      // Delete related siswa and nilai
      const siswaCollection = global.db.collection('siswa');
      const nilaiCollection = global.db.collection('nilai');
      
      const siswaList = await siswaCollection.find({ kelasId: id }).toArray();
      const siswaIds = siswaList.map(s => s._id.toString());
      
      await siswaCollection.deleteMany({ kelasId: id });
      await nilaiCollection.deleteMany({ siswaId: { $in: siswaIds } });
    }
    
    return result.deletedCount > 0;
  }

  static async countSiswa(kelasId) {
    const count = await global.db.collection('siswa').countDocuments({ kelasId });
    return count;
  }
}
