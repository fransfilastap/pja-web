/*
  Warnings:

  - The values [M] on the enum `Candidates_sex` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Candidates` MODIFY `sex` ENUM('L', 'P') NOT NULL;
