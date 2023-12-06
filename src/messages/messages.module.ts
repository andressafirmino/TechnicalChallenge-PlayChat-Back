import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesRepository } from './messages.repository';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  }), AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, UsersService, UsersRepository, PrismaService, AuthService],
  exports: [MessagesService]
})
export class MessagesModule { }
