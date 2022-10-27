import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  numberOfGuests: number;

  @IsNumber()
  @IsOptional()
  numberOfConfirmedGuests: number;

  @IsNotEmpty()
  @IsDate()
  dateHeldAt: Date;
}
