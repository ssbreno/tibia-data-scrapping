-- CreateEnum
CREATE TYPE "CharacterType" AS ENUM ('MAKER', 'BOMBA', 'MAIN');

-- CreateTable
CREATE TABLE "CharacterList" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "vocation" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "type" "CharacterType" NOT NULL,

    CONSTRAINT "CharacterList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CharacterList_name_idx" ON "CharacterList"("name");
