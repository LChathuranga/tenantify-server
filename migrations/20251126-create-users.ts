import { QueryInterface } from 'sequelize'

export async function up(queryInterface: QueryInterface) {
  const sql = `
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM (
      'ROLE_USER',
      'ROLE_ADMIN',
      'ROLE_CASHIER',
      'ROLE_BRANCH_MANAGER',
      'ROLE_STORE_MANAGER'
    );
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.users (
  "id" SERIAL PRIMARY KEY,
  "fullName" VARCHAR NOT NULL,
  "email" VARCHAR NOT NULL UNIQUE,
  "phone" VARCHAR,
  "role" user_role NOT NULL DEFAULT 'ROLE_USER',
  "password" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  "lastLogin" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
  `
  await queryInterface.sequelize.query(sql)
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS public.users;')
  await queryInterface.sequelize.query("DROP TYPE IF EXISTS user_role;")
}

