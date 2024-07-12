import { Injectable } from '@nestjs/common';
import { Character } from '../../../domain/entities/character-list.entity';
import { CharacterRepository } from '../../../domain/repository/character-list.repository';

@Injectable()
export class UpdateCharacterUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(name: string, data: Omit<Character, 'id'>): Promise<any> {
    return this.characterRepository.update(name, data);
  }
}
