/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `respawn_list` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "character" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "respawn_list" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "character_name_key" ON "character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "respawn_list_name_key" ON "respawn_list"("name");
