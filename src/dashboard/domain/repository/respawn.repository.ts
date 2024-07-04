import { Respawn } from '../entities/respawn.entity';

export abstract class RespawnRepository {
  abstract create(respawn: Respawn): Promise<Respawn>;
  abstract update(name: string, respawn: Partial<Respawn>): Promise<Respawn>;
  abstract findById(id: string): Promise<Respawn | null>;
  abstract findMany(): Promise<Respawn[]>;
}
