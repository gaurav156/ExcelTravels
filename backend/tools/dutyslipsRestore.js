import dotenv from "dotenv";
dotenv.config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

async function restoreDutyslips(backupFilePath, options = {}) {
  const {
    shouldMerge = true,
    shouldDecompress = null,
    batchSize = 100 // Insert in batches to avoid overloading
  } = options;

  // Auto-detect compression if not specified
  if (shouldDecompress === null) {
    shouldDecompress = backupFilePath.endsWith('.gz');
  }

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('dutyslips');
    
    let dutyslipsData;
    
    // Handle compressed or uncompressed backup
    if (shouldDecompress) {
      const tempPath = path.join(__dirname, 'temp_dutyslips_restore.json');
      const gunzip = zlib.createGunzip();
      const destination = fs.createWriteStream(tempPath);
      
      await pipeline(
        fs.createReadStream(backupFilePath),
        gunzip,
        destination
      );
      
      dutyslipsData = JSON.parse(fs.readFileSync(tempPath));
      fs.unlinkSync(tempPath); // Clean up temp file
    } else {
      dutyslipsData = JSON.parse(fs.readFileSync(backupFilePath));
    }
    
    // Insert documents back to MongoDB in batches
    if (dutyslipsData.length > 0) {
      let insertedCount = 0;
      
      if (shouldMerge) {
        // Update existing documents or insert new ones
        for (let i = 0; i < dutyslipsData.length; i += batchSize) {
          const batch = dutyslipsData.slice(i, i + batchSize);
          const bulkOps = batch.map(doc => ({
            updateOne: {
              filter: { _id: doc._id },
              update: { $set: doc },
              upsert: true
            }
          }));
          
          const result = await collection.bulkWrite(bulkOps);
          insertedCount += result.upsertedCount + result.modifiedCount;
        }
      } else {
        // Simple insert (might fail on duplicate _id)
        for (let i = 0; i < dutyslipsData.length; i += batchSize) {
          const batch = dutyslipsData.slice(i, i + batchSize);
          const result = await collection.insertMany(batch, { ordered: false });
          insertedCount += result.insertedCount;
        }
      }
      
      console.log(`Restored ${insertedCount} dutyslips to MongoDB`);
      return insertedCount;
    } else {
      console.log('No dutyslips found in backup file');
      return 0;
    }
  } finally {
    await client.close();
  }
}

module.exports = restoreDutyslips;

// Example usage:
// restoreDutyslips('./dutyslips_backups/dutyslips-2023-10-01T12-00-00Z.json.gz')
// restoreDutyslips('./dutyslips_backups/dutyslips-2023-10-01T12-00-00Z.json', false)