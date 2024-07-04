import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RespawnDTO } from '../../domain/dto/respawn.dto';
import { CharacterList } from '../../domain/entities/character-list.entity';
import { CreateCharacterListUseCase } from '../use-cases/create-character-list.use-case';
import { CreateRespawnUseCase } from '../use-cases/create-respawn.use-case';
import { GetAllRespawnsUseCase } from '../use-cases/get-all-respawns.use-case';
import { GetCharacterListUseCase } from '../use-cases/get-character-list.use-case';
import { GetGuildsUseCase } from '../use-cases/get-guilds.use-case';
import { UpdateCharacterListUseCase } from '../use-cases/update-character-list.use-case';
import { UpdateRespawnUseCase } from '../use-cases/update-respawn.use-case';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getGuildsUseCase: GetGuildsUseCase,
    private readonly createRespawnUseCase: CreateRespawnUseCase,
    private readonly updateRespawnUseCase: UpdateRespawnUseCase,
    private readonly getAllRespawnsUseCase: GetAllRespawnsUseCase,
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

  @Get('/respawn/all')
  async respawnfindAll() {
    return this.getAllRespawnsUseCase.execute();
  }

  @Post('/character')
  async create(@Body() data: CharacterList): Promise<CharacterList> {
    return this.createCharacterListUseCase.execute(data);
  }

  @Put('/character/:id')
  async update(
    @Param('id') id: string,
    @Body() data: Partial<CharacterList>,
  ): Promise<CharacterList> {
    return this.updateCharacterListUseCase.execute(id, data);
  }

  @Get('/character/all')
  async findAll(): Promise<CharacterList[]> {
    return this.getCharacterListUseCase.execute();
  }
}
