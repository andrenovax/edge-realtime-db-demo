// drizzle-kit emits migrations.js without types.
declare module "*/migrations-do/migrations.js" {
	import type { migrate } from "drizzle-orm/durable-sqlite/migrator";
	const migrations: Parameters<typeof migrate>[1];
	export default migrations;
}
