import { Injectable } from '@nestjs/common';

import { Respawn } from '../../../domain/entities/respawn.entity';
import { RespawnRepository } from '../../../domain/repository/respawn.repository';

@Injectable()
export class GetAllRespawnsUseCase {
  constructor(private readonly respawnRepository: RespawnRepository) {}

  async execute(): Promise<Respawn[]> {
    return this.respawnRepository.findMany();
  }
}
