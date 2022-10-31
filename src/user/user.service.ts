import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async findUser(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    delete user.hashPassword;
    return user;
  }

  async editUser(userId: number, editUserDto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...editUserDto,
      },
    });
    delete user.hashPassword;
    return user;
  }
}
