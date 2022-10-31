import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { EditCompanyDto } from './dto/edit-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}
  async createCompany(adminUserId: number, dto: CreateCompanyDto) {
    const user = await this.userService.findUser(adminUserId);

    if (!user) throw new NotFoundException('User not found');

    if (user.userRole !== UserRole.ADMIN)
      throw new UnauthorizedException('User not authorized for this action');
    return this.prismaService.company.create({
      data: {
        ...dto,
      },
    });
  }

  async getCompanies() {
    return this.prismaService.company.findMany();
  }

  async getCompaniesById(companyId: number) {
    return this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });
  }

  async editCompaniesById(companyId: number, dto: EditCompanyDto) {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) throw new ForbiddenException('Access to resources denied');

    return this.prismaService.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteCompaniesById(companyId: number) {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) throw new ForbiddenException('Access to resources denied');

    await this.prismaService.company.delete({
      where: {
        id: companyId,
      },
    });
  }
}
