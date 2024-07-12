/*
  Warnings:

  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Respawn` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "characterType" AS ENUM ('MAKER', 'BOMBA', 'MAIN', 'FRACOKS');

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "Respawn";

-- DropEnum
DROP TYPE "CharacterType";

-- CreateTable
CREATE TABLE "respawn" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "character" TEXT,
    "is_pt" BOOLEAN NOT NULL DEFAULT false,
    "pt_members" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "respawn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "character" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "vocation" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "type" "characterType" NOT NULL,

    CONSTRAINT "character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "respawn_list" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "respawn_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "respawn_character_key" ON "respawn"("character");

-- CreateIndex
CREATE INDEX "respawn_name_idx" ON "respawn"("name");

-- CreateIndex
CREATE INDEX "respawn_character_idx" ON "respawn"("character");

-- CreateIndex
CREATE INDEX "character_name_idx" ON "character"("name");

-- CreateIndex
CREATE INDEX "respawn_list_name_idx" ON "respawn_list"("name");
