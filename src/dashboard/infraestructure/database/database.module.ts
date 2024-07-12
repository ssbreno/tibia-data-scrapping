import { Module } from '@nestjs/common';
import { CharacterRepository } from '../../domain/repository/character-list.repository';
import { RespawnRepository } from '../../domain/repository/respawn.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCharacterRepository } from './prisma/repositories/character.prisma.repository';
import { PrismaRespawnRepository } from './prisma/repositories/respawn.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
    {
      provide: CharacterRepository,
      useClass: PrismaCharacterRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
    {
      provide: CharacterRepository,
      useClass: PrismaCharacterRepository,
    },
  ],
})
export class DatabaseModule {}
