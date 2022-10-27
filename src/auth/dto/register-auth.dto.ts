import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
