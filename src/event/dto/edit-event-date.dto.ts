import { IsDate, IsNotEmpty } from 'class-validator';

export class EditEventDateDto {
  @IsNotEmpty()
  @IsDate()
  dateHeldAt: Date;
}
