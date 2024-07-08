import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '../external/external.module';
import { DashboardController } from './application/controllers/dashboard.controller';
import { CreateCharacterListUseCase } from './application/use-cases/character/create-character-list.use-case';
import { GetAllCharacterListUseCase } from './application/use-cases/character/get-all-character-list.use-case';
import { GetCharacterListUseCase } from './application/use-cases/character/get-character-list.use-case';
import { GetGuildsToCharacterUseCase } from './application/use-cases/character/get-guilds-to-character.use-case';
import { UpdateCharacterListUseCase } from './application/use-cases/character/update-character-list.use-case';
import { GetGuildsUseCase } from './application/use-cases/guilds/get-guilds.use-case';
import { CreateRespawnUseCase } from './application/use-cases/respawn/create-respawn.use-case';
import { GetAllRespawnsUseCase } from './application/use-cases/respawn/get-all-respawns.use-case';
import { UpdateRespawnUseCase } from './application/use-cases/respawn/update-respawn.use-case';
import { DatabaseModule } from './infraestructure/database/database.module';
import { MonitorCharacterListGateway } from './infraestructure/socket/monitor-character-list.gateway';

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
    MonitorCharacterListGateway,
    CreateCharacterListUseCase,
    UpdateCharacterListUseCase,
    GetCharacterListUseCase,
    GetAllCharacterListUseCase,
    GetGuildsToCharacterUseCase,
  ],
})
export class DashboardModule {}
