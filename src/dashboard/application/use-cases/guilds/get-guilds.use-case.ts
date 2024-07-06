import { Injectable } from '@nestjs/common';
import { GetGuildsTibiaDataUseCase } from '../../../../external/tibia-data-api/application/use-case/get-guilds.tibia-api.use-case';
import { ApiResponse } from '../../../domain/interfaces/guilds.interface';
import { GetAllCharacterListUseCase } from '../character/get-all-character-list.use-case';

@Injectable()
export class GetGuildsUseCase {
  constructor(
    private readonly getGuildsTibiaDataUseCase: GetGuildsTibiaDataUseCase,
    private readonly getAllCharacterListUseCase: GetAllCharacterListUseCase,
  ) {}

  async execute(): Promise<any> {
    const guildStatus: ApiResponse = await this.getGuilds();
    const registeredCharacters =
      await this.getAllCharacterListUseCase.execute();
    const registeredCharacterNames = registeredCharacters.map(
      (char) => char.name,
    );

    const onlineMembers = guildStatus.guild.members.filter(
      (member) =>
        member.status === 'online' &&
        !registeredCharacterNames.includes(member.name),
    );

    const vocationOrder = [
      'Elite Knight',
      'Knight',
      'Royal Paladin',
      'Paladin',
      'Master Sorcerer',
      'Sorcerer',
      'Elder Druid',
      'Druid',
    ];

    onlineMembers.sort((a, b) => {
      const aOrder = vocationOrder.indexOf(a.vocation);
      const bOrder = vocationOrder.indexOf(b.vocation);
      return aOrder - bOrder;
    });

    const newResponse = {
      guild: {
        total_online: onlineMembers.length,
        members: onlineMembers,
      },
    };

    return newResponse;
  }

  async getGuilds(): Promise<ApiResponse> {
    return this.getGuildsTibiaDataUseCase.getGuilds();
  }
}
