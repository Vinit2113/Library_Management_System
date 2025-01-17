import { IsNumber, IsString } from 'class-validator';

export class UpdatePlanDto {
  @IsString()
  plan: string;

  @IsNumber()
  dasy: number;

  @IsNumber()
  cost: number;
}
