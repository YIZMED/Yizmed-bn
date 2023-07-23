import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { editUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getAllUser() {
    return this.prisma.user.findMany();
  }
  async editUser(userId: number, dto: editUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }
  async DeleteUser(userId: number) {
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    delete deleteUser.hash;
    return deleteUser;
  }
}
