// CLI-only config so `better-auth generate` can emit the drizzle schema.
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { jwt } from 'better-auth/plugins';

export const auth = betterAuth({
	database: drizzleAdapter({} as never, { provider: 'sqlite' }),
	emailAndPassword: { enabled: true },
	plugins: [jwt()],
});
