import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMessageDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: "1",
        description: "Id of the user sending the message"
    })
    senderId: number

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        example: "2",
        description: "Id of the user receiving the message"
    })
    receiverId?: number

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        example: "true",
        description: "Message privacy status"
    })
    isPrivate: boolean

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "example",
        description: "Message text"
    })
    text: string
}
