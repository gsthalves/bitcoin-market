-- CreateTable
CREATE TABLE "AccountBalance" (
    "id" CHAR(36) NOT NULL,
    "accountId" CHAR(36) NOT NULL,
    "currency" "CurrencyType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "AccountBalance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountBalance" ADD CONSTRAINT "AccountBalance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
