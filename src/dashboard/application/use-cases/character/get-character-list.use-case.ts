import { Injectable } from '@nestjs/common';
import { CharacterListDTO } from '../../../domain/dto/character-list.dto';
import { ApiResponse } from '../../../domain/interfaces/guilds.interface';
import { CharacterListRepository } from '../../../domain/repository/character-list.repository';
import { GetAllRespawnsUseCase } from '../respawn/get-all-respawns.use-case';
import { GetGuildsToCharacterUseCase } from './get-guilds-to-character.use-case';

@Injectable()
export class GetCharacterListUseCase {
  private membersTimers: { [name: string]: { timer: number; status: string } } =
    {};

  constructor(
    private readonly characterListRepository: CharacterListRepository,
    private readonly getGuildsToCharacterUseCase: GetGuildsToCharacterUseCase,
    private readonly getRespawnsUseCase: GetAllRespawnsUseCase,
  ) {}

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  async execute(): Promise<{ character: CharacterListDTO; respawn: any }[]> {
    const characterList = await this.characterListRepository.findAll();
    const guildData: ApiResponse =
      await this.getGuildsToCharacterUseCase.execute();
    const respawns = await this.getRespawnsUseCase.execute();

    const onlineMembers = guildData.guild.members.filter((member) =>
      characterList.some((character) => character.name === member.name),
    );

    return onlineMembers.map((member) => {
      const character = characterList.find((char) => char.name === member.name);
      const respawn = respawns.find((resp) => resp.character === member.name);

      if (this.membersTimers[member.name]) {
        if (member.status === 'online') {
          this.membersTimers[member.name].timer += 1;
        } else {
          this.membersTimers[member.name].timer = 0;
        }
      } else {
        this.membersTimers[member.name] = {
          timer: member.status === 'online' ? 1 : 0,
          status: member.status,
        };
      }

      this.membersTimers[member.name].status = member.status;

      return {
        totalOnline: guildData.guild.players_online,
        character: {
          ...character,
          onlineTimer: this.formatTime(this.membersTimers[member.name].timer),
        },
        respawn,
      };
    });
  }
}
