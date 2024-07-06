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
import { GetCharacterListUseCase } from '../../application/use-cases/character/get-character-list.use-case';

@WebSocketGateway({
  cors: {
    origin: FRONT_END_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class MonitorCharacterListGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('MonitorCharacterListGateway');
  constructor(
    private readonly monitorCharacterListUseCase: GetCharacterListUseCase,
  ) {}

  afterInit(server: Server) {
    this.logger.log('Init');
    setInterval(async () => {
      const characterData = await this.monitorCharacterListUseCase.execute();
      this.server.emit('characterListData', characterData);
    }, 1000);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('requestCharacterListData')
  async handleRequestCharacterListData(client: Socket): Promise<void> {
    const characterData = await this.monitorCharacterListUseCase.execute();
    client.emit('characterListData', characterData);
  }
}
