import * as argon from 'argon2';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async register(dto: RegisterAuthDto) {
    //Generate password hash
    const hash = await argon.hash(dto.password);
    try {
      //Save user in the db
      const user = await this.prismaService.user.create({
        data: {
          companyId: dto.companyId,
          email: dto.email,
          hashPassword: hash,
        },
      });
      //Return user
      return await this.signToken(user.id, user.email);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        // Prisma code for duplicate entry
        if (err.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw err;
    }
  }
  async login(dto: LoginAuthDto) {
    // Find the user by email
    const user = await this.prismaService.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    // If user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    // Compare passwords
    const passwordMatches = await argon.verify(user.hashPassword, dto.password);
    // If password not correct throw exception
    if (!passwordMatches) throw new ForbiddenException('Credentials incorrect');
    // Return user
    return await this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });
    return {
      access_token,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    const passwordMatches = await argon.verify(user.hashPassword, password);
    if (user && passwordMatches) {
      return user;
    }
    return null;
  }
}
