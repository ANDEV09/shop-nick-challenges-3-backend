-- CreateTable
CREATE TABLE `game_groups` (
    `id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `active` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `game_groups_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `game_groups` ADD CONSTRAINT `game_groups_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `game_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
