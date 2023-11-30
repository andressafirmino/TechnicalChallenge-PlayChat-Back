import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateMessageDto {

    @IsNumber()
    @IsNotEmpty()
    senderId: number

    @IsNumber()
    @IsOptional()
    receiverId?: number

    @IsBoolean()
    @IsNotEmpty()
    isPrivate: boolean

    @IsString()
    @IsNotEmpty()
    text: string
}
