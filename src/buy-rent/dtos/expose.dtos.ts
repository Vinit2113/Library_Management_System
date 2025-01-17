import { Exclude } from 'class-transformer';

export class buyRentExposeDto {
  @Exclude()
  status: number;

  @Exclude()
  updated: Date;

  @Exclude()
  id: number;
}
