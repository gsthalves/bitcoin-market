/*
  Warnings:

  - The primary key for the `Balance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Balance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currency]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Balance_pkey" PRIMARY KEY ("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_currency_key" ON "Balance"("currency");
