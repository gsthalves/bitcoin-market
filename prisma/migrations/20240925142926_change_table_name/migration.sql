/*
  Warnings:

  - You are about to drop the `AccountBalance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccountBalance" DROP CONSTRAINT "AccountBalance_accountId_fkey";

-- DropTable
DROP TABLE "AccountBalance";

-- CreateTable
CREATE TABLE "Balance" (
    "id" CHAR(36) NOT NULL,
    "accountId" CHAR(36) NOT NULL,
    "currency" "CurrencyType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
