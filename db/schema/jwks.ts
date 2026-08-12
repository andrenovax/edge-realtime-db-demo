/**
 * JWKS keypairs for the Better Auth `jwt()` plugin.
 * Private keys encrypted at rest by Better Auth.
 */
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const jwks = sqliteTable("jwks", {
  id: text("id").primaryKey(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
});
