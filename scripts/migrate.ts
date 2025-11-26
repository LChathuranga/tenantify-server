// Development migration runner — runs migrations/*.ts (development only)
// WARNING: Use only in development. For production, use proper migration tooling.
import sequelize from '../src/config/database'
import { readdirSync } from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function migrate() {
  const migrationsDir = path.resolve(__dirname, '..', 'migrations')
  const files = readdirSync(migrationsDir).filter((f) => f.endsWith('.ts') || f.endsWith('.js'))

  try {
    const queryInterface = sequelize.getQueryInterface()
    for (const file of files.sort()) {
      const migrationPath = path.join(migrationsDir, file)
      console.log('Running migration', migrationPath)
      // Dynamic import; support both ts and compiled js
      const mod = await import(pathToFileURL(migrationPath).href)
      if (typeof mod.up === 'function') {
        await mod.up(queryInterface, sequelize)
        console.log('Migration applied:', file)
      } else {
        console.log('Skipping migration (no up):', file)
      }
    }
    console.log('All migrations applied')
    process.exit(0)
  } catch (err) {
    console.error('DB migration failed', err)
    process.exit(1)
  }
}

migrate()
