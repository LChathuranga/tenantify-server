import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  const sql = `
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'store_status_value') THEN
    CREATE TYPE store_status_value AS ENUM (
      'ACTIVE',
      'PENDING',
      'SUSPENDED'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.stores (
  "id" SERIAL PRIMARY KEY,
  "brand" VARCHAR NOT NULL,
  "storeAdminId" INTEGER NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  "description" VARCHAR,
  "storeType" VARCHAR,
  "storeStatus" store_status_value NOT NULL DEFAULT 'ACTIVE',
  "address" VARCHAR,
  "phone" VARCHAR,
  "email" VARCHAR,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
  `;
  await queryInterface.sequelize.query(sql);
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS public.stores;');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS store_status_value;');
}
