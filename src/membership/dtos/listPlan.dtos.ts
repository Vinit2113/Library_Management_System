import { Expose } from 'class-transformer';

export class listPlanDtos {
  @Expose()
  plan: string;

  @Expose()
  days: number;

  @Expose()
  cost: number;
}
