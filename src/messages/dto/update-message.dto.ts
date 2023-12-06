import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { IsNumber, IsString } from 'class-validator';

export class MessageDto extends PartialType(CreateMessageDto) {

    @IsNumber()
    id: number

    @IsString()
    createdAt: string

    @IsString()
    updatedAt: string
}
