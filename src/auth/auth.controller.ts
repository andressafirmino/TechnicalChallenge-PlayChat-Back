import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("sign-up")
    signUp(@Body() signUpDto: CreateUserDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post("sign-in")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

}
