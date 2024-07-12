import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '../external/external.module';
import { DashboardController } from './application/controllers/dashboard.controller';
import { GetCharacterUseCase } from './application/use-cases/character/get-character-list.use-case';
import { GetGuildsToCharacterUseCase } from './application/use-cases/character/get-guilds-to-character.use-case';
import { UpdateCharacterUseCase } from './application/use-cases/character/update-character-list.use-case';
import { GetGuildsUseCase } from './application/use-cases/guilds/get-guilds.use-case';
import { CreateRespawnUseCase } from './application/use-cases/respawn/create-respawn.use-case';
import { GetAllRespawnsUseCase } from './application/use-cases/respawn/get-all-respawns.use-case';
import { UpdateRespawnUseCase } from './application/use-cases/respawn/update-respawn.use-case';
import { DatabaseModule } from './infraestructure/database/database.module';
import { MonitorCharacterGateway } from './infraestructure/socket/monitor-character-list.gateway';

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
    MonitorCharacterGateway,
    UpdateCharacterUseCase,
    GetCharacterUseCase,
    GetGuildsToCharacterUseCase,
  ],
})
export class DashboardModule {}
