import "dotenv/config";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function clearAllDatabases() {
  try {
    await client.connect();
    console.log('🔍 Connected to MongoDB...\n');
    
    // List all databases
    const adminDb = client.db().admin();
    const databasesList = await adminDb.listDatabases();
    
    console.log('📋 Found databases:');
    databasesList.databases.forEach(db => {
      console.log(`  - ${db.name}`);
    });
    console.log('');
    
    // Clear specific database we're using
    const dbNames = ['rapordigital', 'rapor_digital', 'test'];
    
    for (const dbName of dbNames) {
      try {
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray();
        
        if (collections.length > 0) {
          console.log(`🗑️  Clearing database: ${dbName}`);
          
          for (const collection of collections) {
            const result = await db.collection(collection.name).deleteMany({});
            console.log(`  ✅ Cleared ${collection.name}: ${result.deletedCount} documents`);
          }
        }
      } catch (error) {
        // Database might not exist, skip
      }
    }
    
    console.log('\n✅ All data cleared successfully!');
    console.log('You can now register with any email.');
    
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    await client.close();
    process.exit(1);
  }
}

clearAllDatabases();
