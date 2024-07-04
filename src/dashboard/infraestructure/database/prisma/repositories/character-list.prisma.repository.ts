import { Injectable } from '@nestjs/common';
import { CharacterList } from '../../../../domain/entities/character-list.entity';
import { CharacterListRepository } from '../../../../domain/repository/character-list.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaCharacterListRepository implements CharacterListRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CharacterList): Promise<CharacterList> {
    return this.prisma.characterList.create({ data });
  }

  async update(
    id: string,
    data: Partial<CharacterList>,
  ): Promise<CharacterList> {
    return this.prisma.characterList.update({ where: { id }, data });
  }

  async findAll(): Promise<CharacterList[]> {
    return this.prisma.characterList.findMany();
  }

  async findById(id: string): Promise<CharacterList> {
    return this.prisma.characterList.findUnique({ where: { id } });
  }
}
