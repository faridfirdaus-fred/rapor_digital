import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export class User {
  static getCollection() {
    return global.db.collection('users');
  }

  static async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = {
      email: data.email,
      password: hashedPassword,
      name: data.name || data.email.split('@')[0],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await this.getCollection().insertOne(user);
    return { _id: result.insertedId, ...user };
  }

  static async findAll() {
    return await this.getCollection().find({}).toArray();
  }

  static async findById(id) {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  static async findByEmail(email) {
    return await this.getCollection().findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') }
    });
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updatePassword(userId, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await this.getCollection().findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    );
    return result;
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
    return result.deletedCount > 0;
  }

  static sanitize(user) {
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export class ResetToken {
  static getCollection() {
    return global.db.collection('resetTokens');
  }

  static async create(userId, token) {
    const resetToken = {
      userId,
      token,
      expiresAt: new Date(Date.now() + 3600000),
      createdAt: new Date()
    };
    const result = await this.getCollection().insertOne(resetToken);
    return { _id: result.insertedId, ...resetToken };
  }

  static async findByToken(token) {
    const resetToken = await this.getCollection().findOne({ token });
    if (!resetToken) return null;
    
    if (new Date() > resetToken.expiresAt) {
      await this.delete(resetToken._id);
      return null;
    }
    
    return resetToken;
  }

  static async delete(id) {
    const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  static async deleteByUserId(userId) {
    await this.getCollection().deleteMany({ userId });
  }
}
