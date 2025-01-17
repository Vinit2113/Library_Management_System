import { Test, TestingModule } from '@nestjs/testing';
import { BuyRentService } from './buy-rent.service';

describe('BuyRentService', () => {
  let service: BuyRentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuyRentService],
    }).compile();

    service = module.get<BuyRentService>(BuyRentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
