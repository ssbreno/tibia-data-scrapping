import { Module } from '@nestjs/common';
import { CharacterListRepository } from '../../domain/repository/character-list.repository';
import { RespawnRepository } from '../../domain/repository/respawn.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaCharacterListRepository } from './prisma/repositories/character-list.prisma.repository';
import { PrismaRespawnRepository } from './prisma/repositories/respawn.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
    {
      provide: CharacterListRepository,
      useClass: PrismaCharacterListRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
    {
      provide: CharacterListRepository,
      useClass: PrismaCharacterListRepository,
    },
  ],
})
export class DatabaseModule {}
