import { CharacterType as PrismaCharacterType } from '@prisma/client';
import { CharacterType } from '../enums/character-type.enum';

export class CharacterListMapper {
  public static mapCharacterType(type: any): CharacterType {
    if (typeof type === 'string') {
      switch (type) {
        case 'MAKER':
          return CharacterType.MAKER;
        case 'BOMBA':
          return CharacterType.BOMBA;
        case 'MAIN':
          return CharacterType.MAIN;
        default:
          throw new Error(`Unsupported character type: ${type}`);
      }
    }

    switch (type) {
      case PrismaCharacterType.MAKER:
        return CharacterType.MAKER;
      case PrismaCharacterType.BOMBA:
        return CharacterType.BOMBA;
      case PrismaCharacterType.MAIN:
        return CharacterType.MAIN;
      default:
        throw new Error(`Unsupported character type: ${type}`);
    }
  }
}
