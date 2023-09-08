import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto, UserToProjectDto, UserUpdateDto } from '../dto/user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('users')
@UseGuards(AuthGuard)
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

  @PublicAccess()
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

  @Post('add-to-project')
  public async addToProject(@Body() body: UserToProjectDto) {
    return await this.usersService.relationToProject(body);
  }
}
