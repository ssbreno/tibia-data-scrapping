import { Injectable } from '@nestjs/common';
import { Character } from '../../../../domain/entities/character-list.entity';
import { CharacterRepository } from '../../../../domain/repository/character-list.repository';
import { CharacterPrismaMapper } from '../mappers/character-list.mapper.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCharacterRepository implements CharacterRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Character): Promise<Character> {
    const existingCharacter = await this.prisma.character.findFirst({
      where: {
        name: { equals: data.name },
      },
    });
    if (existingCharacter) return;

    const convertedData = {
      ...data,
      type: CharacterPrismaMapper.mapCharacterTypeToPrisma(data.type),
    };

    const createdCharacter = await this.prisma.character.create({
      data: convertedData,
    });

    return {
      ...createdCharacter,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(createdCharacter.type),
    };
  }

  async update(name: string, data: Omit<Character, 'id'>): Promise<void> {
    const convertedData = {
      ...data,
      type: CharacterPrismaMapper.mapCharacterTypeToPrisma(data.type),
    };

    await this.prisma.character.updateMany({
      where: { name },
      data: convertedData,
    });
  }

  async findAll(): Promise<Character[]> {
    const characters = await this.prisma.character.findMany({});
    return characters.map((character) => ({
      ...character,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(character.type),
    }));
  }

  async findById(id: string): Promise<Character> {
    const character = await this.prisma.character.findUnique({
      where: { id },
    });
    return {
      ...character,
      type: CharacterPrismaMapper.mapCharacterTypeToApp(character.type),
    };
  }
}
