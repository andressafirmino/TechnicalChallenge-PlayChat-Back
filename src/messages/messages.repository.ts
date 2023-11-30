import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesRepository {

    constructor(private readonly prisma: PrismaService) { }

    async createMessage(createMessageDto: CreateMessageDto) {
        return await this.prisma.message.create({
            data: createMessageDto
        })
    }
}