import { CharacterListDTO } from '../dto/character-list.dto';
import { RespawnDTO } from '../dto/respawn.dto';

export interface CharacterRespawnDTO {
  totalOnline: number;
  character: CharacterListDTO & { onlineTimer: string };
  respawn: RespawnDTO | null;
}
