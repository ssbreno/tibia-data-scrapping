import { Injectable } from '@nestjs/common';
import { CharacterList } from '../../../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../../../domain/repository/character-list.repository';
import { CharacterPrismaMapper } from '../mappers/character-list.mapper.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCharacterListRepository implements CharacterListRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CharacterList): Promise<CharacterList> {
    const existingCharacter = await this.prisma.characterList.findFirst({
      where: {
        name: { equals: data.name },
      },
    });
    if (existingCharacter) return;

    const convertedData = {
      ...data,
      type: CharacterPrismaMapper.mapCharacterTypeToPrisma(data.type),
    };

    const createdCharacter = await this.prisma.characterList.create({
      data: convertedData,
    });

    return {
      ...createdCharacter,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(createdCharacter.type),
    };
  }

  async update(
    id: string,
    data: Partial<CharacterList>,
  ): Promise<CharacterList> {
    const convertedData = {
      ...data,
      type: data.type
        ? CharacterPrismaMapper.mapCharacterTypeToPrisma(data.type)
        : undefined,
    };

    const updatedCharacter = await this.prisma.characterList.update({
      where: { id },
      data: convertedData,
    });

    return {
      ...updatedCharacter,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(updatedCharacter.type),
    };
  }

  async findAll(): Promise<CharacterList[]> {
    const characters = await this.prisma.characterList.findMany();
    return characters.map((character) => ({
      ...character,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(character.type),
    }));
  }

  async findById(id: string): Promise<CharacterList> {
    const character = await this.prisma.characterList.findUnique({
      where: { id },
    });
    return {
      ...character,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(character.type),
    };
  }
}
