import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function clearDatabase() {
  try {
    await client.connect();
    const db = client.db('rapordigital');
    
    console.log('🗑️  Clearing all collections from database: rapordigital...');
    
    await db.collection('users').deleteMany({});
    console.log('✅ Cleared users');
    
    await db.collection('kelas').deleteMany({});
    console.log('✅ Cleared kelas');
    
    await db.collection('siswa').deleteMany({});
    console.log('✅ Cleared siswa');
    
    await db.collection('nilai').deleteMany({});
    console.log('✅ Cleared nilai');
    
    await db.collection('resetTokens').deleteMany({});
    console.log('✅ Cleared resetTokens');
    
    console.log('✅ All data cleared successfully!');
    console.log('You can now register with your email again.');
    
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    await client.close();
    process.exit(1);
  }
}

clearDatabase();

