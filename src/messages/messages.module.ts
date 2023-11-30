import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MessagesRepository } from './messages.repository';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository, UsersService, UsersRepository, PrismaService],
})
export class MessagesModule { }
