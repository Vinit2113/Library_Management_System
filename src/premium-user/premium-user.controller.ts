import { Controller, Get, Headers, Param } from '@nestjs/common';
import { PremiumUserService } from './premium-user.service';

@Controller('premium-user')
export class PremiumUserController {
  constructor(private premiumUserService: PremiumUserService) {}

  @Get('buy/:membershipId')
  async getMember(
    @Headers('authorization') token: string,
    @Param('membershipId') membershipId: number,
  ) {
    return await this.premiumUserService.buySubs(token, membershipId);
  }
}
