import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RespawnDTO } from '../../domain/dto/respawn.dto';
import { CreateRespawnUseCase } from '../use-cases/create-respawn.use-case';
import { GetAllRespawnsUseCase } from '../use-cases/get-all-respawns.use-case';
import { GetGuildsUseCase } from '../use-cases/get-guilds.use-case';
import { UpdateRespawnUseCase } from '../use-cases/update-respawn.use-case';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getGuildsUseCase: GetGuildsUseCase,
    private readonly createRespawnUseCase: CreateRespawnUseCase,
    private readonly updateRespawnUseCase: UpdateRespawnUseCase,
    private readonly getAllRespawnsUseCase: GetAllRespawnsUseCase,
  ) {}

  @Get('/guilds')
  async getGuilds(): Promise<any> {
    return this.getGuildsUseCase.execute();
  }

  @Post('/respawn')
  async create(@Body() data: RespawnDTO): Promise<any> {
    return await this.createRespawnUseCase.execute(data);
  }

  @Put('/respawn/:name')
  async update(@Param('name') name: string, @Body() data: Partial<RespawnDTO>) {
    return this.updateRespawnUseCase.execute(name, data);
  }

  @Get('/respawn/all')
  async findAll() {
    return this.getAllRespawnsUseCase.execute();
  }
}
