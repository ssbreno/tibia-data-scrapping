import { Module } from '@nestjs/common';
import { GetGuildsTibiaDataUseCase } from './tibia-data-api/application/use-case/get-guilds.tibia-api.use-case';

@Module({
  imports: [],
  providers: [GetGuildsTibiaDataUseCase],
  exports: [GetGuildsTibiaDataUseCase],
})
export class ExternalModule {}
