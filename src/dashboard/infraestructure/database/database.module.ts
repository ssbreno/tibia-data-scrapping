import { Module } from '@nestjs/common';
import { RespawnRepository } from '../../domain/repository/respawn.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaRespawnRepository } from './prisma/repositories/respawn.prisma.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: RespawnRepository,
      useClass: PrismaRespawnRepository,
    },
  ],
})
export class DatabaseModule {}
