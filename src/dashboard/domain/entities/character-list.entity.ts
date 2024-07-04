import { CharacterType } from '@prisma/client';

export class CharacterList {
  id: string;
  name: string;
  vocation: string;
  level: number;
  type: CharacterType;
}
