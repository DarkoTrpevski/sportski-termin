import { IsNotEmpty, IsString } from 'class-validator';

export class EditCompanyDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;
}
