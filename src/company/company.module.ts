import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, UserService],
})
export class CompanyModule {}
