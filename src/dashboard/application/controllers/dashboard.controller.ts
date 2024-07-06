import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CharacterListDTO } from '../../domain/dto/character-list.dto';
import { RespawnDTO } from '../../domain/dto/respawn.dto';
import { CharacterList } from '../../domain/entities/character-list.entity';
import { CreateCharacterListUseCase } from '../use-cases/character/create-character-list.use-case';
import { GetCharacterListUseCase } from '../use-cases/character/get-character-list.use-case';
import { UpdateCharacterListUseCase } from '../use-cases/character/update-character-list.use-case';
import { GetGuildsUseCase } from '../use-cases/guilds/get-guilds.use-case';
import { CreateRespawnUseCase } from '../use-cases/respawn/create-respawn.use-case';
import { UpdateRespawnUseCase } from '../use-cases/respawn/update-respawn.use-case';

@Controller('')
export class DashboardController {
  constructor(
    private readonly getGuildsUseCase: GetGuildsUseCase,
    private readonly createRespawnUseCase: CreateRespawnUseCase,
    private readonly updateRespawnUseCase: UpdateRespawnUseCase,
    private readonly createCharacterListUseCase: CreateCharacterListUseCase,
    private readonly updateCharacterListUseCase: UpdateCharacterListUseCase,
    private readonly getCharacterListUseCase: GetCharacterListUseCase,
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

  @Post('/character')
  async create(@Body() data: CharacterListDTO): Promise<CharacterList> {
    return this.createCharacterListUseCase.execute(data);
  }

  @Put('/character/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CharacterListDTO>,
  ): Promise<CharacterList> {
    return this.updateCharacterListUseCase.execute(id, data);
  }

  @Get('/character/all')
  async findAll(): Promise<{ character: CharacterList; respawn: any }[]> {
    return this.getCharacterListUseCase.execute();
  }
}
