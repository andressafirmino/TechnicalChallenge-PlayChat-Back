import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class WebsocketService implements OnGatewayConnection {

    @WebSocketServer()
    private server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log(client.id)
    }

    @SubscribeMessage("send-message")
    sendMessage(@MessageBody() body: any) {
        console.log(body) 
    }
}
