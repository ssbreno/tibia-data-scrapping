import { CharacterType } from '../enums/character-type.enum';

export class CharacterList {
  id?: string;
  name: string;
  vocation: string;
  level: number;
  type: CharacterType;
}
