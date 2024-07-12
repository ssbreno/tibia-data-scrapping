import { CharacterDTO } from '../dto/character.dto';
import { RespawnDTO } from '../dto/respawn.dto';

export interface CharacterRespawnDTO {
  totalOnline: number;
  character: CharacterDTO & { onlineTimer: string };
  respawn: RespawnDTO | null;
}
