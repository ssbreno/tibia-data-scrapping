import { Injectable } from '@nestjs/common';
import { Respawn } from '../../../../domain/entities/respawn.entity';
import { RespawnRepository } from '../../../../domain/repository/respawn.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRespawnRepository implements RespawnRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(respawn: Respawn): Promise<Respawn> {
    const existingRespawn = await this.prisma.respawn.findFirst({
      where: {
        character: { equals: respawn.character },
      },
    });
    if (existingRespawn) return;
    const createdRespawn = await this.prisma.respawn.create({
      data: {
        id: respawn.id,
        name: respawn.name,
        character: respawn.character,
        is_pt: respawn.is_pt,
        pt_members: respawn.pt_members,
      },
    });
    return createdRespawn;
  }

  async update(name: string, data: Partial<Respawn>): Promise<Respawn> {
    const existingRespawn = await this.prisma.respawn.findFirst({
      where: {
        character: { equals: name },
      },
    });

    if (existingRespawn) {
      const updatedRespawn = await this.prisma.respawn.update({
        where: { character: name },
        data,
      });
      return updatedRespawn;
    } else {
      const newRespawn = await this.prisma.respawn.create({
        data: {
          ...data,
          character: name,
        },
      });
      return newRespawn;
    }
  }

  async findById(id: string): Promise<Respawn | null> {
    return this.prisma.respawn.findUnique({ where: { id } });
  }

  async findMany(): Promise<Respawn[]> {
    return this.prisma.respawn.findMany();
  }
}
