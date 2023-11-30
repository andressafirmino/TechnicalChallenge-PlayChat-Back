import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {

  constructor(
    private readonly repository: UsersRepository,
    private readonly jwt: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto
    const { userName, userEmail } = await this.repository.findByNameAndEmail(name, email);

    if (userName || userEmail) throw new ConflictException("Name and/or email already exist");

    await this.repository.createUser(createUserDto);
    return;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.repository.findUserByEmail(email);
    if (!user) throw new UnauthorizedException("Invalid name and/or password");

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) throw new UnauthorizedException("Invalid name and/or password");

    const token = this.jwt.sign(email);

    return await this.repository.signIn(email, token);
  }
  /* 
    findOne(id: number) {
      return `This action returns a #${id} user`;
    }
  
    update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} user`;
    } */
}
