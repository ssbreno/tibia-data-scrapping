import { characterType as PrismaCharacterType } from '@prisma/client';
import { CharacterType as AppCharacterType } from '../../../../domain/enums/character-type.enum';

export class CharacterPrismaMapper {
  public static mapCharacterTypeToApp(
    type: PrismaCharacterType,
  ): AppCharacterType {
    switch (type) {
      case PrismaCharacterType.BOMBA:
        return AppCharacterType.BOMBA;
      case PrismaCharacterType.FRACOKS:
        return AppCharacterType.FRACOKS;
      case PrismaCharacterType.MAIN:
        return AppCharacterType.MAIN;
      case PrismaCharacterType.MAKER:
        return AppCharacterType.MAKER;
      default:
        return AppCharacterType.FRACOKS as AppCharacterType;
    }
  }

  public static mapCharacterTypeToPrisma(
    type: AppCharacterType,
  ): PrismaCharacterType {
    switch (type) {
      case AppCharacterType.BOMBA:
        return PrismaCharacterType.BOMBA;
      case AppCharacterType.FRACOKS:
        return PrismaCharacterType.FRACOKS;
      case AppCharacterType.MAIN:
        return PrismaCharacterType.MAIN;
      case AppCharacterType.MAKER:
        return PrismaCharacterType.MAKER;
      default:
        return PrismaCharacterType.FRACOKS;
    }
  }
}
