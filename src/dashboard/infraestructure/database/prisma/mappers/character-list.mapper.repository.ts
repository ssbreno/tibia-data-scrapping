import { CharacterType as PrismaCharacterType } from '@prisma/client';
import { CharacterType as AppCharacterType } from '../../../../domain/enums/character-type.enum';

export class CharacterPrismaMapper {
  public static mapCharacterTypeToApp(
    type: PrismaCharacterType,
  ): AppCharacterType {
    switch (type) {
      case PrismaCharacterType.MAKER:
        return AppCharacterType.MAKER;
      case PrismaCharacterType.BOMBA:
        return AppCharacterType.BOMBA;
      case PrismaCharacterType.MAIN:
        return AppCharacterType.MAIN;
      default:
        return AppCharacterType.MAIN as AppCharacterType;
    }
  }

  public static mapCharacterTypeToPrisma(
    type: AppCharacterType,
  ): PrismaCharacterType {
    switch (type) {
      case AppCharacterType.MAKER:
        return PrismaCharacterType.MAKER;
      case AppCharacterType.BOMBA:
        return PrismaCharacterType.BOMBA;
      case AppCharacterType.MAIN:
        return PrismaCharacterType.MAIN;
      default:
        return PrismaCharacterType.BOMBA;
    }
  }
}
