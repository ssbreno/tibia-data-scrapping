import { Injectable } from '@nestjs/common';
import { CharacterListDTO } from '../../../domain/dto/character-list.dto';
import { CharacterList } from '../../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../../domain/repository/character-list.repository';

@Injectable()
export class CreateCharacterListUseCase {
  constructor(
    private readonly characterListRepository: CharacterListRepository,
  ) {}

  async execute(data: CharacterListDTO): Promise<CharacterList> {
    return this.characterListRepository.create(data);
  }
}
