import { defineConfig } from 'drizzle-kit';

// Per-user schema, applied inside each UserDO on wake.
export default defineConfig({
	dialect: 'sqlite',
	driver: 'durable-sqlite',
	schema: './src/user-do/schema.ts',
	out: './migrations-do',
});
