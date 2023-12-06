import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesRepository } from './messages.repository';
import { UsersRepository } from 'src/users/users.repository';
import { User } from '@prisma/client';

@Injectable()
export class MessagesService {

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly userRepository: UsersRepository
  ) { }

  async createMessage(createMessageDto: CreateMessageDto) {
    const { senderId, receiverId, text, isPrivate } = createMessageDto;

    if (isPrivate && !receiverId || !isPrivate && receiverId) throw new BadRequestException("Invalid data when sending private message");
    if (senderId === receiverId) throw new BadRequestException("Private message must have a receiver other than the sender");

    if (receiverId) {
      const users = await this.userRepository.findUsersById(senderId, receiverId);
      if (users.length !== 2) throw new BadRequestException("Private message should only be sent between registered users");
    }

    return await this.messagesRepository.createMessage(createMessageDto);
  }

  async findAllMessages() {
    return await this.messagesRepository.findAllMessages();
  }

  async findPrivateMessagesById(senderId: string, receiverId: string) {
    return await this.messagesRepository.findPrivateMessagesById(parseInt(senderId), parseInt(receiverId));
  }
}
