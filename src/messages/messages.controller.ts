import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '../guards/auth.guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('messages')
@ApiTags("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto)
  }

  @Get()
  findAll() {
    return this.messagesService.findAllMessages();
  }

  @Get(':senderId/:receiverId')
  findOne(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return this.messagesService.findPrivateMessagesById(senderId, receiverId);
  }
}
