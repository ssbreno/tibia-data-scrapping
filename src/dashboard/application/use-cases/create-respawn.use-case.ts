import { Injectable } from '@nestjs/common';
import { Respawn } from '../../domain/entities/respawn.entity';
import { RespawnRepository } from '../../domain/repository/respawn.repository';

@Injectable()
export class CreateRespawnUseCase {
  constructor(private readonly respawnRepository: RespawnRepository) {}

  async execute(data: Omit<Respawn, 'id'>): Promise<Respawn> {
    return await this.respawnRepository.create(data);
  }
}
