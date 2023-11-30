import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  async createUser(data: CreateUserDto) {
    return await this.prisma.user.create({ data })
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
  /*  findAll() {
     return `This action returns all users`;
   }
 
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
