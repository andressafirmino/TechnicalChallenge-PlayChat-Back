import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  async createUser(CreateUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: {
        ...CreateUserDto,
        password: bcrypt.hashSync(CreateUserDto.password, 10)
      }
    })
  }

  async findByNameAndEmail(name: string, email: string) {
    const userName = await this.prisma.user.findUnique({
      where: { name }
    });
    const userEmail = await this.prisma.user.findUnique({
      where: { email }
    })
    console.log(userName, userEmail)
    return { userName, userEmail };
  }
  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } })
  }

  async signIn(email: string, token: string) {
    return await this.prisma.session.create({
      data: { email, token }, select: { token: true }
    })
  }

  async findUserSession(id: number) {
    return await this.prisma.session.findUnique({ where: { id } })
  }

  async logout(id: number) {
    return await this.prisma.session.delete({ where: { id } })
  }
}
