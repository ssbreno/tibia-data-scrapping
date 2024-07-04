import { Controller, Get } from '@nestjs/common';
import { GetGuildsUseCase } from '../use-cases/get-guilds.use-case';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getGuildsUseCase: GetGuildsUseCase) {}

  @Get('/guilds')
  async getGuilds(): Promise<any> {
    return this.getGuildsUseCase.execute();
  }
}
