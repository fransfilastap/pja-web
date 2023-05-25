/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Candidates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Candidates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Candidates` ADD COLUMN `code` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Candidates_code_key` ON `Candidates`(`code`);
