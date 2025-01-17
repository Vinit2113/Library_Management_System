import { Test, TestingModule } from '@nestjs/testing';
import { PremiumUserController } from './premium-user.controller';

describe('PremiumUserController', () => {
  let controller: PremiumUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremiumUserController],
    }).compile();

    controller = module.get<PremiumUserController>(PremiumUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
