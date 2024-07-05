import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { FRONT_END_URL } from '../../../common/constants';
import { GetGuildsUseCase } from '../../application/use-cases/get-guilds.use-case';

@WebSocketGateway({
  cors: {
    origin: FRONT_END_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class GuildsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('GuildsGateway');
  constructor(private readonly getGuildsUseCase: GetGuildsUseCase) {}

  afterInit(server: Server) {
    this.logger.log('Init');
    setInterval(async () => {
      const guildData = await this.getGuildsUseCase.execute();
      this.server.emit('guildData', guildData);
    }, 1000);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('requestGuildData')
  async handleRequestGuildData(client: Socket): Promise<void> {
    const guildData = await this.getGuildsUseCase.execute();
    client.emit('guildData', guildData);
  }
}
