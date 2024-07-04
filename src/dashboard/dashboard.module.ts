import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '../external/external.module';
import { DashboardController } from './application/controllers/dashboard.controller';
import { CreateCharacterListUseCase } from './application/use-cases/create-character-list.use-case';
import { CreateRespawnUseCase } from './application/use-cases/create-respawn.use-case';
import { GetAllRespawnsUseCase } from './application/use-cases/get-all-respawns.use-case';
import { GetCharacterListUseCase } from './application/use-cases/get-character-list.use-case';
import { GetGuildsUseCase } from './application/use-cases/get-guilds.use-case';
import { UpdateCharacterListUseCase } from './application/use-cases/update-character-list.use-case';
import { UpdateRespawnUseCase } from './application/use-cases/update-respawn.use-case';
import { DatabaseModule } from './infraestructure/database/database.module';
import { GuildsGateway } from './infraestructure/socket/guilds.gateway';

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
    GuildsGateway,
    CreateCharacterListUseCase,
    UpdateCharacterListUseCase,
    GetCharacterListUseCase,
  ],
})
export class DashboardModule {}
