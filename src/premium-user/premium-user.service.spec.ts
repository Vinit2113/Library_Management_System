import { Test, TestingModule } from '@nestjs/testing';
import { PremiumUserService } from './premium-user.service';

describe('PremiumUserService', () => {
  let service: PremiumUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremiumUserService],
    }).compile();

    service = module.get<PremiumUserService>(PremiumUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
