import { Injectable } from '@nestjs/common';
import { GetGuildsTibiaDataUseCase } from '../../../../external/tibia-data-api/application/use-case/get-guilds.tibia-api.use-case';
import { ApiResponse } from '../../../domain/interfaces/guilds.interface';

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
        members: onlineMembers,
      },
    };

    return newResponse;
  }

  async getGuilds(): Promise<ApiResponse> {
    return this.getGuildsTibiaDataUseCase.getGuilds();
  }
}
