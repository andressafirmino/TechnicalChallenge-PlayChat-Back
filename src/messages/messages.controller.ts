import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) { }

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAllMessages();
  }

  @Get(':senderId/:receiverId')
  findOne(@Param('senderId') senderId: string, @Param('receiverId') receiverId: string) {
    return this.messagesService.findPrivateMessagesById(senderId, receiverId);
  }
  /* 
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
      return this.messagesService.update(+id, updateMessageDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.messagesService.remove(+id);
    } */
}
