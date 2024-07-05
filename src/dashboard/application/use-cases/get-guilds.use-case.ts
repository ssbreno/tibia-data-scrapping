import { Injectable } from '@nestjs/common';
import { GetGuildsTibiaDataUseCase } from '../../../external/tibia-data-api/application/use-case/get-guilds.tibia-api.use-case';
import { ApiResponse } from '../../domain/interfaces/guilds.interface';

@Injectable()
export class GetGuildsUseCase {
  private membersTimers: { [name: string]: { timer: number; status: string } } =
    {};

  constructor(
    private readonly getGuildsTibiaDataUseCase: GetGuildsTibiaDataUseCase,
  ) {}

  async execute(): Promise<any> {
    const guildStatus: ApiResponse = await this.getGuilds();

    const updatedMembers = guildStatus.guild.members.map((member) => {
      const existingMember = this.membersTimers[member.name];

      if (existingMember) {
        if (member.status === 'online') {
          if (existingMember.status === 'online') {
            this.membersTimers[member.name].timer += 1;
          } else {
            this.membersTimers[member.name].timer = 1;
          }
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
        ...member,
        onlineTimer: this.formatTime(this.membersTimers[member.name].timer),
      };
    });

    const onlineMembers = updatedMembers.filter(
      (member) => member.status === 'online',
    );

    // Ordenação conforme a vocação
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
        total_online: guildStatus.guild.players_online,
        members: onlineMembers,
      },
    };

    return newResponse;
  }

  async getGuilds(): Promise<ApiResponse> {
    return this.getGuildsTibiaDataUseCase.getGuilds();
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}
