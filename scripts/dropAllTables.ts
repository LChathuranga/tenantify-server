
import sequelize from '../src/config/database';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function dropAllTables() {
  const migrationFile = '20251213-drop-all-tables.ts';
  const migrationsDir = path.resolve(__dirname, '..', 'migrations/deleteDb');
  const migrationPath = path.join(migrationsDir, migrationFile);

  try {
    const queryInterface = sequelize.getQueryInterface();
    const mod = await import(pathToFileURL(migrationPath).href);
    if (typeof mod.up === 'function') {
      await mod.up(queryInterface, sequelize);
      console.log('All tables dropped successfully.');
    } else {
      console.log('Skipping drop (no up function found)');
    }
    process.exit(0);
  } catch (err) {
    console.error('Drop all tables failed', err);
    process.exit(1);
  }
}

dropAllTables();
