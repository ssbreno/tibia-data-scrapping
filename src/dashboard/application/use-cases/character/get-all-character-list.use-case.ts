import { Injectable } from '@nestjs/common';
import { CharacterList } from '../../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../../domain/repository/character-list.repository';

@Injectable()
export class GetAllCharacterListUseCase {
  constructor(private readonly respawnRepository: CharacterListRepository) {}

  async execute(): Promise<CharacterList[]> {
    return this.respawnRepository.findAll();
  }
}
