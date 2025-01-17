import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Membership } from './membership.entity';
import { Repository } from 'typeorm';
import { NewPlanDto } from './dtos/newPlan.dtos';
import { AuthService } from 'src/auth/auth.service';
import { UpdatePlanDto } from './dtos/updatePlan.dtos';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership) private memberRepo: Repository<Membership>,
    private authService: AuthService,
  ) {}

  async findPlanById(memberid: number): Promise<Membership> {
    console.log('memberId', memberid);
    return this.memberRepo.findOne({
      where: { id: memberid, status: 1 },
      select: ['id', 'days'],
    });
  }

  async NewPlan(token: string, newPlanDto: NewPlanDto): Promise<Membership> {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken || decodedToken.role !== 'admin') {
      throw new UnauthorizedException('You are not allowed to access this ');
    }
    const newPlan = this.memberRepo.create(newPlanDto);
    return await this.memberRepo.save(newPlan);
  }

  async listPlans(token: string): Promise<Membership[]> {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('You must login to access');
    }
    return await this.memberRepo.find({ where: { status: 1 } });
  }

  async updatePlan(
    token: string,
    id: number,
    updatePlanDto: UpdatePlanDto,
  ): Promise<Membership> {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken || decodedToken.role !== 'admin') {
      throw new UnauthorizedException('You are not allowed to update');
    }
    const planDetail = await this.memberRepo.findOne({
      where: { id: id, status: 1 },
    });
    if (!planDetail) {
      throw new NotFoundException('Plan not found');
    }
    for (const keys of Object.keys(updatePlanDto)) {
      if (keys in planDetail) {
        planDetail[keys] = updatePlanDto[keys];
      }
    }

    return await this.memberRepo.save(planDetail);
  }

  async deletePlan(token: string, id: number) {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken || decodedToken.role !== 'admin') {
      throw new UnauthorizedException('You are not authorized');
    }

    const deletePlan = await this.memberRepo.findOne({
      where: { id: id, status: 1 },
    });
    deletePlan.status = 0;
    return await this.memberRepo.save(deletePlan);
  }
}
