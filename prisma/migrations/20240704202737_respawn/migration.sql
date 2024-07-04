-- CreateTable
CREATE TABLE "Respawn" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "character" TEXT NOT NULL,
    "is_pt" BOOLEAN NOT NULL DEFAULT false,
    "pt_members" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Respawn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Respawn_name_idx" ON "Respawn"("name");

-- CreateIndex
CREATE INDEX "Respawn_character_idx" ON "Respawn"("character");
