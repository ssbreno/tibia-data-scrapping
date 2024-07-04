import { Injectable } from '@nestjs/common';
import { CharacterList } from '../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../domain/repository/character-list.repository';

@Injectable()
export class GetCharacterListUseCase {
  constructor(
    private readonly characterListRepository: CharacterListRepository,
  ) {}

  async execute(): Promise<CharacterList[]> {
    return this.characterListRepository.findAll();
  }
}
