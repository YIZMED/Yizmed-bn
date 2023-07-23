import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { editUserDto } from './dto';
import { UserService } from './user.service';
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAll(@GetUser() user: User) {
    return user;
  }
  @Patch()
  editUser(
    @GetUser() user: User,
    @Body() dto: editUserDto,
  ) {
    const { id } = user;
    return this.userService.editUser(id, dto);
  }
  @Delete()
  deleteUser(@GetUser() user: User) {
    const { id } = user;
    return this.userService.DeleteUser(id);
  }
}
