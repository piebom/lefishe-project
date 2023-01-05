-- AlterTable
ALTER TABLE `account` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL,
    MODIFY `id_token` TEXT NULL;

-- CreateTable
CREATE TABLE `Vangst` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `date` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `weight` DOUBLE NOT NULL,
    `imageURL` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
