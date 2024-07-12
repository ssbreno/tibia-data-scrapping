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
import { GetCharacterUseCase } from '../../application/use-cases/character/get-character-list.use-case';

@WebSocketGateway({
  cors: {
    origin: FRONT_END_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MonitorCharacterGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MonitorCharacterGateway');
  constructor(private readonly monitorCharacterUseCase: GetCharacterUseCase) {}

  afterInit(server: Server) {
    this.logger.log('Init');
    setInterval(async () => {
      const characterData = await this.monitorCharacterUseCase.execute();
      this.server.emit('characterData', characterData);
    }, 3000);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('requestCharacterData')
  async handleRequestCharacterData(client: Socket): Promise<void> {
    const characterData = await this.monitorCharacterUseCase.execute();
    client.emit('characterData', characterData);
  }
}
