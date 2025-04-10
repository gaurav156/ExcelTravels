import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { promisify } from 'util';
const pipeline = promisify(require('stream').pipeline);

async function backupDutyslips(options = {}) {
  // Set default options
  const {
    shouldCompress = true,
    shouldDeleteAfterBackup = false,
    monthsToKeep = 4,
    backupDir = path.join(__dirname, 'dutyslips_backups')
  } = options;

  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection('dutyslips');
    
    // Calculate cutoff date
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - monthsToKeep);
    
    // Find documents older than cutoff
    const oldDutyslips = await collection.find({ 
      $or: [
        { createdAt: { $lt: cutoffDate } },
        { updatedAt: { $lt: cutoffDate } } // Include updatedAt if you track modifications
      ]
    }).toArray();
    
    if (oldDutyslips.length === 0) {
      console.log(`No dutyslips older than ${monthsToKeep} months found`);
      return { backupPath: null, deletedCount: 0 };
    }
    
    // Create backup directory if not exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFilename = `dutyslips-${timestamp}.json${shouldCompress ? '.gz' : ''}`;
    const backupPath = path.join(backupDir, backupFilename);
    
    // Write data to temp file first
    const tempPath = path.join(backupDir, `temp-${timestamp}.json`);
    fs.writeFileSync(tempPath, JSON.stringify(oldDutyslips, null, 2));
    
    // Compress if needed
    if (shouldCompress) {
      const gzip = zlib.createGzip();
      await pipeline(
        fs.createReadStream(tempPath),
        gzip,
        fs.createWriteStream(backupPath)
      );
      fs.unlinkSync(tempPath); // Remove temp file
      console.log(`Compressed backup created at ${backupPath}`);
    } else {
      fs.renameSync(tempPath, backupPath);
      console.log(`Backup created at ${backupPath}`);
    }
    
    // Delete from MongoDB if requested
    let deletedCount = 0;
    if (shouldDeleteAfterBackup) {
      const deleteResult = await collection.deleteMany({ 
        $or: [
          { createdAt: { $lt: cutoffDate } },
          { updatedAt: { $lt: cutoffDate } }
        ]
      });
      deletedCount = deleteResult.deletedCount;
      console.log(`Deleted ${deletedCount} old dutyslips from MongoDB`);
    } else {
      console.log('Skipping deletion from MongoDB as per configuration');
    }
    
    return { backupPath, deletedCount };
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

module.exports = backupDutyslips;

// Example usages:
// Backup with compression and deletion
// backupDutyslips({ shouldCompress: true, shouldDeleteAfterBackup: true });

// Backup without compression and no deletion
// backupDutyslips({ shouldCompress: false, shouldDeleteAfterBackup: false });

// Backup with custom months threshold
// backupDutyslips({ monthsToKeep: 6, shouldDeleteAfterBackup: true });