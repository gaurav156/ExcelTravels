import backupDutyslips from "./dutyslipsBackup";
import restoreDutyslips from "./dutyslipsRestore";
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('backup', {
    type: 'boolean',
    description: 'Run backup operation'
  })
  .option('restore', {
    type: 'boolean',
    description: 'Run restore operation'
  })
  .option('file', {
    type: 'string',
    description: 'Backup file path for restoration'
  })
  .option('compress', {
    type: 'boolean',
    default: true,
    description: 'Use compression for backup'
  })
  .option('delete', {
    type: 'boolean',
    default: false,
    description: 'Delete from MongoDB after successful backup'
  })
  .option('months', {
    type: 'number',
    default: 4,
    description: 'Months threshold for backup'
  })
  .argv;

async function main() {
  if (argv.backup) {
    console.log(`Starting dutyslips backup...`);
    const result = await backupDutyslips({
      shouldCompress: argv.compress,
      shouldDeleteAfterBackup: argv.delete,
      monthsToKeep: argv.months
    });
    console.log('Backup completed:', result);
  } 
  else if (argv.restore) {
    if (!argv.file) {
      console.error('Please specify backup file with --file');
      process.exit(1);
    }
    console.log(`Restoring dutyslips from ${argv.file}...`);
    const count = await restoreDutyslips(argv.file);
    console.log(`Restored ${count} documents`);
  } 
  else {
    console.log('Usage:');
    console.log('  Backup: node dutyslipsManager.js --backup [--compress=false] [--delete] [--months=6]');
    console.log('  Restore: node dutyslipsManager.js --restore --file=path/to/backup');
  }
}

main().catch(console.error);

// Backup with compression (default):
// node dutyslipsManager.js --backup

// Backup without compression:
// node dutyslipsManager.js --backup --compress=false

// Restore from backup:
// node dutyslipsManager.js --restore --file=./dutyslips_backups/dutyslips-2023-10-01T12-00-00Z.json.gz

// ----------------------------------------------------------

// Backup without deleting:
// node dutyslipsManager.js --backup --delete=false

// Backup with deletion and custom period:
// node dutyslipsManager.js --backup --delete --months=6

// Restore from backup:
// node dutyslipsManager.js --restore --file=./backups/dutyslips-2023-10-01.json.gz