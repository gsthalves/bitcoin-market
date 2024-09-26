-- CreateTable
CREATE TABLE "BitcoinHistory" (
    "id" CHAR(36) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "high" DECIMAL(65,30) NOT NULL,
    "low" DECIMAL(65,30) NOT NULL,
    "vol" DECIMAL(65,30) NOT NULL,
    "last" DECIMAL(65,30) NOT NULL,
    "buy" DECIMAL(65,30) NOT NULL,
    "sell" DECIMAL(65,30) NOT NULL,
    "open" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "BitcoinHistory_pkey" PRIMARY KEY ("id")
);
