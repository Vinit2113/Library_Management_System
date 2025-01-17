import { Test, TestingModule } from '@nestjs/testing';
import { BuyRentController } from './buy-rent.controller';

describe('BuyRentController', () => {
  let controller: BuyRentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuyRentController],
    }).compile();

    controller = module.get<BuyRentController>(BuyRentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
