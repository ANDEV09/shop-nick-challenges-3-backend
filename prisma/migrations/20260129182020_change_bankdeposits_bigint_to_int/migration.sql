/*
  Warnings:

  - You are about to alter the column `amount` on the `bank_deposits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `balance_before` on the `bank_deposits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `balance_after` on the `bank_deposits` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `bank_deposits` MODIFY `amount` INTEGER NOT NULL,
    MODIFY `balance_before` INTEGER NOT NULL,
    MODIFY `balance_after` INTEGER NOT NULL;
