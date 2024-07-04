/*
  Warnings:

  - A unique constraint covering the columns `[character]` on the table `Respawn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Respawn_character_key" ON "Respawn"("character");
