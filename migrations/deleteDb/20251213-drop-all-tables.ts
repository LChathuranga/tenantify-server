import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Drop all tables in the correct order to avoid foreign key issues
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS public.stores CASCADE;');
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS public.users CASCADE;');
  await queryInterface.sequelize.query('DROP TABLE IF EXISTS public.token_blacklists CASCADE;');
  // Drop enums if needed
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS user_role;');
  await queryInterface.sequelize.query('DROP TYPE IF EXISTS store_status_value;');
}

export async function down(queryInterface: QueryInterface) {
  // No down migration for drop all
}
