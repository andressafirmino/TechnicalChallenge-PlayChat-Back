import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwt: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto
    const { userName, userEmail } = await this.userRepository.findByNameAndEmail(name, email);

    if (userName || userEmail) throw new ConflictException("Name and/or email already exist");

    await this.userRepository.createUser(createUserDto);
    return;
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

  async logout(id: string) {
    const sessionId = parseInt(id);
    const session = await this.userRepository.findUserSession(sessionId);
    if (!session) throw new UnauthorizedException("Unauthorized user");

    return await this.userRepository.logout(session.id);
  }

  async findUsersById(senderId: number, receiverId: number) {
    return await this.userRepository.findUsersById(senderId, receiverId)
  }
}
