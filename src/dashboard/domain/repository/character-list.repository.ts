import { Character } from '../entities/character-list.entity';

export abstract class CharacterRepository {
  abstract create(data: Character): Promise<Character>;
  abstract update(name: string, data: Omit<Character, 'id'>): Promise<void>;
  abstract findAll(): Promise<Character[]>;
  abstract findById(id: string): Promise<Character>;
}
