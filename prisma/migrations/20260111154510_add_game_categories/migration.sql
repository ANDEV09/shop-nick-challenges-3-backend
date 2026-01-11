/*
  Warnings:

  - You are about to drop the column `active` on the `game_groups` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `game_groups` DROP COLUMN `active`,
    ADD COLUMN `status` INTEGER NOT NULL DEFAULT 0;
