-- Local development seed data. infra/alchemy.run.ts imports this file only
-- during `alchemy dev`, after the regular D1 migrations have been applied.
-- Both users authenticate through Better Auth with: demo-password-123
INSERT INTO `user` (
  `id`, `name`, `email`, `email_verified`, `role`, `created_at`, `updated_at`
) VALUES (
  'demo-admin', 'Demo Admin', 'demo-admin@local.test', 1, 'admin',
  cast(unixepoch('subsecond') * 1000 as integer),
  cast(unixepoch('subsecond') * 1000 as integer)
)
ON CONFLICT(`id`) DO UPDATE SET
  `name` = excluded.`name`,
  `email` = excluded.`email`,
  `email_verified` = excluded.`email_verified`,
  `role` = excluded.`role`,
  `updated_at` = excluded.`updated_at`;

INSERT INTO `user` (
  `id`, `name`, `email`, `email_verified`, `role`, `created_at`, `updated_at`
) VALUES (
  'demo-user', 'Demo User', 'demo-user@local.test', 1, 'user',
  cast(unixepoch('subsecond') * 1000 as integer),
  cast(unixepoch('subsecond') * 1000 as integer)
)
ON CONFLICT(`id`) DO UPDATE SET
  `name` = excluded.`name`,
  `email` = excluded.`email`,
  `email_verified` = excluded.`email_verified`,
  `role` = excluded.`role`,
  `updated_at` = excluded.`updated_at`;

INSERT INTO `account` (
  `id`, `account_id`, `issuer`, `provider_id`, `user_id`, `password`, `created_at`, `updated_at`
) VALUES (
  'demo-admin-credential', 'demo-admin', 'local:credential', 'credential', 'demo-admin',
  'c93e3efd3ec94f6600ffa67151effb85:47a3b0fee0bdf35430550cf4961ecb16f196dc7916aeef392fe12acc1c8ceaa5632dbca5431c4ce465b8e0144acf97309b05694d90f044f138c09d0924f5486e',
  cast(unixepoch('subsecond') * 1000 as integer),
  cast(unixepoch('subsecond') * 1000 as integer)
)
ON CONFLICT(`id`) DO UPDATE SET
  `account_id` = excluded.`account_id`,
  `issuer` = excluded.`issuer`,
  `provider_id` = excluded.`provider_id`,
  `user_id` = excluded.`user_id`,
  `password` = excluded.`password`,
  `updated_at` = excluded.`updated_at`;

INSERT INTO `account` (
  `id`, `account_id`, `issuer`, `provider_id`, `user_id`, `password`, `created_at`, `updated_at`
) VALUES (
  'demo-user-credential', 'demo-user', 'local:credential', 'credential', 'demo-user',
  'c93e3efd3ec94f6600ffa67151effb85:47a3b0fee0bdf35430550cf4961ecb16f196dc7916aeef392fe12acc1c8ceaa5632dbca5431c4ce465b8e0144acf97309b05694d90f044f138c09d0924f5486e',
  cast(unixepoch('subsecond') * 1000 as integer),
  cast(unixepoch('subsecond') * 1000 as integer)
)
ON CONFLICT(`id`) DO UPDATE SET
  `account_id` = excluded.`account_id`,
  `issuer` = excluded.`issuer`,
  `provider_id` = excluded.`provider_id`,
  `user_id` = excluded.`user_id`,
  `password` = excluded.`password`,
  `updated_at` = excluded.`updated_at`;
