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

    async findAllMessages() {
        return await this.prisma.message.findMany({
            include: { sender: true, receiver: true }
        });
    }

    async findPrivateMessagesById(senderId: number, receiverId: number) {
        const privateMessages = await this.prisma.message.findMany({
            where: {
                isPrivate: true,
                OR: [
                    {
                        senderId: senderId,
                        receiverId: receiverId,
                    },
                    {
                        senderId: receiverId,
                        receiverId: senderId,
                    },
                ],
            },
            orderBy: {
                createdAt: 'asc'
            },
        });

        return privateMessages;
    }
}