import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleEmitSocket({ data, event, to }) {
    if (event === 'message') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
    }
  }
  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'message', data);
  }
  @SubscribeMessage('renderStockProduct')
  async handleStock(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    return this.sendToClient(socket.id, 'renderStockProduct', data);
  }

  sendToClient(clientId: string, event: string, data: any) {
    this.server.emit(event, data);
  }
  afterInit(socket: Socket): any {}
  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }
  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
