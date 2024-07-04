import { Injectable } from '@nestjs/common';
import { GetGuildsTibiaDataUseCase } from '../../../external/tibia-data-api/application/use-case/get-guilds.tibia-api.use-case';
import { ApiResponse } from '../../domain/interfaces/guilds.interface';

@Injectable()
export class GetGuildsUseCase {
  constructor(
    private readonly getGuildsTibiaDataUseCase: GetGuildsTibiaDataUseCase,
  ) {}

  async execute(): Promise<any> {
    const guildStatus: ApiResponse = await this.getGuilds();

    const onlineMembers = guildStatus.guild.members.filter(
      (member) => member.status === 'online',
    );

    const groupByVocation = (members) => {
      const vocationMap = {
        'Elite Knight': 'Knight',
        'Elder Druid': 'Druid',
        'Royal Paladin': 'Paladin',
        'Master Sorcerer': 'Sorcerer',
      };

      return members.reduce((acc, member) => {
        const vocationGroup = vocationMap[member.vocation] || member.vocation;
        if (!acc[vocationGroup]) {
          acc[vocationGroup] = [];
        }
        acc[vocationGroup].push(member);
        return acc;
      }, {});
    };

    const groupedOnlineMembers = groupByVocation(onlineMembers);

    const newResponse = {
      guild: {
        total_online: guildStatus.guild.players_online,
        members: groupedOnlineMembers,
      },
    };
    return newResponse;
  }

  async getGuilds(): Promise<ApiResponse> {
    return this.getGuildsTibiaDataUseCase.getGuilds();
  }
}
