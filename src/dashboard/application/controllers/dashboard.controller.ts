import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterDTO } from '../../domain/dto/character.dto';
import { RespawnDTO } from '../../domain/dto/respawn.dto';
import { Character } from '../../domain/entities/character-list.entity';
import { GetCharacterUseCase } from '../use-cases/character/get-character-list.use-case';
import { UpdateCharacterUseCase } from '../use-cases/character/update-character-list.use-case';
import { GetGuildsUseCase } from '../use-cases/guilds/get-guilds.use-case';
import { CreateRespawnUseCase } from '../use-cases/respawn/create-respawn.use-case';
import { UpdateRespawnUseCase } from '../use-cases/respawn/update-respawn.use-case';

@Controller('')
export class DashboardController {
  constructor(
    private readonly getGuildsUseCase: GetGuildsUseCase,
    private readonly createRespawnUseCase: CreateRespawnUseCase,
    private readonly updateRespawnUseCase: UpdateRespawnUseCase,
    private readonly updateCharacterUseCase: UpdateCharacterUseCase,
    private readonly getCharacterUseCase: GetCharacterUseCase,
  ) {}

  @Get('/guilds')
  async getGuilds(): Promise<any> {
    return this.getGuildsUseCase.execute();
  }

  @Post('/respawn')
  async respawnCreate(@Body() data: RespawnDTO): Promise<any> {
    return await this.createRespawnUseCase.execute(data);
  }

  @Put('/respawn/:name')
  async respawnUpdate(
    @Param('name') name: string,
    @Body() data: Partial<RespawnDTO>,
  ) {
    return this.updateRespawnUseCase.execute(name, data);
  }

  @Put('/character/:name')
  async update(
    @Param('name') name: string,
    @Body() data: Omit<CharacterDTO, 'id'>,
  ): Promise<any> {
    return this.updateCharacterUseCase.execute(name, data);
  }

  @Get('/character/all')
  async findAll(): Promise<{ character: Character; respawn: any }[]> {
    return this.getCharacterUseCase.execute();
  }
}
