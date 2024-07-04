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

      const grouped = members.reduce((acc, member) => {
        const vocationGroup =
          member.level < 200
            ? 'MAKER'
            : vocationMap[member.vocation] || member.vocation;
        if (!acc[vocationGroup]) {
          acc[vocationGroup] = [];
        }
        acc[vocationGroup].push(member);
        return acc;
      }, {});

      for (const key in grouped) {
        grouped[key].sort((a, b) => b.level - a.level);
      }

      const result = {};
      Object.keys(grouped)
        .sort((a, b) => {
          if (a === 'MAKER') return 1;
          if (b === 'MAKER') return -1;
          return 0;
        })
        .forEach((key) => {
          result[key] = grouped[key];
        });

      return result;
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
