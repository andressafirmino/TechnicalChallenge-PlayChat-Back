import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/login-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("sign-up")
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post("sign-in")
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }
  /*  @Get()
   findAll() {
     return this.usersService.findAll();
   }
 
   @Get(':id')
   findOne(@Param('id') id: string) {
     return this.usersService.findOne(+id);
   }
 
   @Patch(':id')
   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
     return this.usersService.update(+id, updateUserDto);
   }
 */
  @Delete("user/:id")
  remove(@Param('id') id: string) {
    return this.usersService.logout(id);
  }
}
