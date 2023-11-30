import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {

  constructor(private readonly repository: UsersRepository) { }

  async createUser(createUserDto: CreateUserDto) {
    const { name, email } = createUserDto
    const { userName, userEmail } = await this.repository.findByNameAndEmail(name, email);

    if (userName || userEmail) throw new HttpException("User already exists", HttpStatus.CONFLICT);

    return await this.repository.createUser(createUserDto);
  }

  /* findAll() {
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
