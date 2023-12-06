import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SignInDto } from 'src/users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly userRepository: UsersRepository,
        private readonly jwt: JwtService
    ) { }

    async signUp(signUpDto: CreateUserDto) {
        return await this.userService.createUser(signUpDto);
    }

    async signIn(signInDto: SignInDto) {
        const { email, password } = signInDto;
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) throw new UnauthorizedException("Invalid name and/or password");

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) throw new UnauthorizedException("Invalid name and/or password");

        const token = this.jwt.sign(email);

        return await this.userRepository.signIn(email, token);
    }

    checkToken(token: string) {
        return this.jwt.verify(token);
    }
}
