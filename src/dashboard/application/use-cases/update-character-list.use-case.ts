import { Injectable } from '@nestjs/common';
import { CharacterList } from '../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../domain/repository/character-list.repository';

@Injectable()
export class UpdateCharacterListUseCase {
  constructor(
    private readonly characterListRepository: CharacterListRepository,
  ) {}

  async execute(
    id: string,
    data: Partial<CharacterList>,
  ): Promise<CharacterList> {
    return this.characterListRepository.update(id, data);
  }
}
