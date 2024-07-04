import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '../external/external.module';
import { DashboardController } from './application/controllers/dashboard.controller';
import { CreateRespawnUseCase } from './application/use-cases/create-respawn.use-case';
import { GetAllRespawnsUseCase } from './application/use-cases/get-all-respawns.use-case';
import { GetGuildsUseCase } from './application/use-cases/get-guilds.use-case';
import { UpdateRespawnUseCase } from './application/use-cases/update-respawn.use-case';
import { DatabaseModule } from './infraestructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ExternalModule,
    DatabaseModule,
  ],
  controllers: [DashboardController],
  providers: [
    GetGuildsUseCase,
    CreateRespawnUseCase,
    UpdateRespawnUseCase,
    GetAllRespawnsUseCase,
  ],
})
export class DashboardModule {}
