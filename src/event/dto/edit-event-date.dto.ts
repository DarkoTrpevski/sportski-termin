import { IsISO8601, IsNotEmpty } from 'class-validator';

export class EditEventDateDto {
  @IsNotEmpty()
  @IsISO8601()
  currentdateHeldAt: Date;
}
