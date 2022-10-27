import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { EditCompanyDto } from './dto/edit-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}
  async createCompany(dto: CreateCompanyDto) {
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
