import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "name",
        description: "User name"
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "email@user.com",
        description: "User email"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    @ApiProperty({
        example: "password",
        description: "User password"
    })
    password: string;
}


