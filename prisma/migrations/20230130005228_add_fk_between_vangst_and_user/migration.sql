/*
  Warnings:

  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Vangst` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vangst` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `example`;

-- AddForeignKey
ALTER TABLE `Vangst` ADD CONSTRAINT `Vangst_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
