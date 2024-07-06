import { Injectable } from '@nestjs/common';
import { Respawn } from '../../../domain/entities/respawn.entity';
import { RespawnRepository } from '../../../domain/repository/respawn.repository';

@Injectable()
export class UpdateRespawnUseCase {
  constructor(private readonly respawnRepository: RespawnRepository) {}

  async execute(name: string, data: Partial<Respawn>): Promise<Respawn> {
    return this.respawnRepository.update(name, data);
  }
}
