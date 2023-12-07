import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketService } from './websocket/websocket.service';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, WebsocketService],
})
export class AppModule { }


