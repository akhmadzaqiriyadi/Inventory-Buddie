/*
  Warnings:

  - Added the required column `totalPrice` to the `DetailTrx` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DetailTrx` ADD COLUMN `totalPrice` DOUBLE NOT NULL;
