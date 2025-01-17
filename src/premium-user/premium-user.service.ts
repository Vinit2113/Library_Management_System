import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PremiumsUser } from './premium-user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MembershipService } from 'src/membership/membership.service';

@Injectable()
export class PremiumUserService {
  constructor(
    @InjectRepository(PremiumsUser)
    private premiumUserRepo: Repository<PremiumsUser>,
    private membershipService: MembershipService,
    private authService: AuthService,
  ) {}

  async buySubs(token: string, planId: number): Promise<PremiumsUser> {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    // console.log(getUserIdFromToken);

    // existing member checks if the user is already member or not
    const existingMember = await this.premiumUserRepo.findOne({
      where: { user_id: decodedToken.userId, active: 1 },
    });

    if (existingMember) {
      throw new ConflictException('You are already a member of this library');
    }

    const _membership_ = await this.membershipService.findPlanById(planId);
    // console.log('membershipd id', _membership_.id);

    if (!_membership_) {
      throw new NotFoundException('Plan not found ');
    }
    // console.log('decodedtoken.user_id', decodedToken.userId);

    const __member__ = new PremiumsUser();
    __member__.user_id = decodedToken.userId;
    __member__.end_date = new Date();
    __member__.end_date.setDate(
      __member__.end_date.getDate() + _membership_.days,
    );
    __member__.membership = _membership_;
    // console.log('_membership_', _membership_.id);
    // console.log('aonasnfnai', __member__.membership);

    return await this.premiumUserRepo.save(__member__);
  }
}
