import { IsNumber } from 'class-validator';

export class BuyRentDtos {
  @IsNumber()
  buy: boolean;

  @IsNumber()
  rent: boolean;

  @IsNumber()
  totalDaysRented: number;
}
