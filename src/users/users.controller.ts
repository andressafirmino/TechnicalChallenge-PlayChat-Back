import { Controller, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/login-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller()
@ApiTags("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post("sign-up")
  @ApiResponse({ status: HttpStatus.CREATED, description: "Registered user" })
  @ApiOperation({ summary: "Register a user" })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Authenticate a user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Logged in user" })
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }

  @Delete("user/:id")
  @ApiParam({
    name: "id",
    description: "User id",
    example: "1"
  })
  @ApiOperation({ summary: "Log out a user" })
  @ApiResponse({ status: HttpStatus.OK, description: "Logged out user" })
  remove(@Param('id') id: string) {
    return this.usersService.logout(id);
  }
}
