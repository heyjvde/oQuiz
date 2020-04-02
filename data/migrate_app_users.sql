-- on rajoute un champ dans la table app_users
ALTER TABLE "app_users" ADD COLUMN "role" TEXT DEFAULT 'user';

UPDATE "app_users" SET "role" = 'admin' WHERE "id" = 3;