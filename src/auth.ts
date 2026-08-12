import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './db/schema.ts';

export type AppEnv = {
	DB: D1Database;
	USER_DO: DurableObjectNamespace;
	BETTER_AUTH_SECRET: string;
};

// Per-request: D1 binding only exists per invocation.
export function createAuth(env: AppEnv) {
	return betterAuth({
		database: drizzleAdapter(drizzle(env.DB, { schema }), { provider: 'sqlite' }),
		secret: env.BETTER_AUTH_SECRET,
		emailAndPassword: { enabled: true },
	});
}
