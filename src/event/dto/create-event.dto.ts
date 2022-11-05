import {
  IsArray,
  IsBoolean,
  IsISO8601,
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

  @IsBoolean()
  @IsNotEmpty()
  isRecurring: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  numberOfGuests?: number;

  @IsArray()
  @IsOptional()
  subscribedGuests?: string[];

  @IsNotEmpty()
  @IsISO8601()
  currentdateHeldAt: Date;
}
