/*
  Warnings:

  - You are about to drop the column `name` on the `vangst` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vangst` DROP COLUMN `name`,
    ADD COLUMN `locatieId` VARCHAR(191) NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE `Vangst` ADD CONSTRAINT `Vangst_locatieId_fkey` FOREIGN KEY (`locatieId`) REFERENCES `Locatie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
