import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: "email@user.com",
        description: "User email"
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "password",
        description: "User password"
    })
    password: string;
}
