import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExternalModule } from '../external/external.module';
import { DashboardController } from './application/controllers/dashboard.controller';
import { GetGuildsUseCase } from './application/use-cases/get-guilds.use-case';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ExternalModule],
  controllers: [DashboardController],
  providers: [GetGuildsUseCase],
})
export class DashboardModule {}
