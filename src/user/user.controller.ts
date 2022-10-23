import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guards';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('me')
  async findOne(@CurrentUser() user: User) {
    return user;
  }

  @Patch()
  editUser(
    @CurrentUser('id') userId: number,
    @Body() editUserDto: EditUserDto,
  ) {
    return this.userService.editUser(userId, editUserDto);
  }
}
