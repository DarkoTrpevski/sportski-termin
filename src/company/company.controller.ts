import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { EditCompanyDto } from './dto/edit-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  createCompanies(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.createCompany(createCompanyDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getCompanies() {
    return this.companyService.getCompanies();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getCompaniesById(@Param('id', ParseIntPipe) companyId: number) {
    return this.companyService.getCompaniesById(companyId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  editCompaniesById(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() editCompanyDto: EditCompanyDto,
  ) {
    return this.companyService.editCompaniesById(companyId, editCompanyDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteCompaniesById(@Param('id', ParseIntPipe) companyId: number) {
    return this.companyService.deleteCompaniesById(companyId);
  }
}
