import { Injectable } from '@nestjs/common';
import { CharacterRespawnDTO } from '../../../domain/interfaces/character-respawn.interface';
import { ApiResponse } from '../../../domain/interfaces/guilds.interface';
import { CharacterListRepository } from '../../../domain/repository/character-list.repository';
import { formatTime } from '../../../shared/utils/format-time.utils';
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

  async execute(): Promise<CharacterRespawnDTO[]> {
    const characterList = await this.characterListRepository.findAll();
    const guildData: ApiResponse =
      await this.getGuildsToCharacterUseCase.execute();
    const respawns = await this.getRespawnsUseCase.execute();

    const onlineMembers = guildData.guild.members.filter((member) =>
      characterList.some((character) => character.name === member.name),
    );

    const charactersRespawn = onlineMembers.map((member) => {
      const character = characterList.find((char) => char.name === member.name);
      const respawn =
        respawns.find((resp) => resp.character === member.name) || null;

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
          onlineTimer: formatTime(this.membersTimers[member.name].timer),
        },
        respawn,
      };
    });

    const groupedByVocation: { [vocation: string]: CharacterRespawnDTO[] } = {};

    charactersRespawn.forEach((charRespawn) => {
      const vocation = charRespawn.character.vocation;
      if (!groupedByVocation[vocation]) {
        groupedByVocation[vocation] = [];
      }
      groupedByVocation[vocation].push(charRespawn);
    });

    Object.keys(groupedByVocation).forEach((vocation) => {
      groupedByVocation[vocation].sort(
        (a, b) => b.character.level - a.character.level,
      );
    });

    const sortedCharacters: CharacterRespawnDTO[] = [];
    Object.values(groupedByVocation).forEach((group) => {
      sortedCharacters.push(...group);
    });

    return sortedCharacters;
  }
}
