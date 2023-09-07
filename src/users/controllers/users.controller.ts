import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserUpdateDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  public async findAllUsers() {
    return this.usersService.findUsers();
  }

  @Post('register')
  public async registerUser(@Body() body: UserDto) {
    return this.usersService.createUser(body);
  }

  @Get(':id')
  public async getUserById(@Param('id') id: string) {
    return this.usersService.findUsersById(id);
  }

  @Put(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ) {
    return this.usersService.updateUser(body, id);
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
