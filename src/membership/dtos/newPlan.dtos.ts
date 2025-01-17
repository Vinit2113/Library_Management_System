import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewPlanDto {
  @IsString()
  @IsNotEmpty()
  plan: string;

  @IsNumber()
  @IsNotEmpty()
  days: number;

  @IsNumber()
  @IsNotEmpty()
  cost: number;
}
