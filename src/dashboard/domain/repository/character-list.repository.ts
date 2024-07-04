import { CharacterList } from '../entities/character-list.entity';

export abstract class CharacterListRepository {
  abstract create(data: CharacterList): Promise<CharacterList>;
  abstract update(
    id: string,
    data: Partial<CharacterList>,
  ): Promise<CharacterList>;
  abstract findAll(): Promise<CharacterList[]>;
  abstract findById(id: string): Promise<CharacterList>;
}
