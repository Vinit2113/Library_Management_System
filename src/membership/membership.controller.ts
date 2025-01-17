import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { MembershipService } from './membership.service';
import { NewPlanDto } from './dtos/newPlan.dtos';
import { listPlanInterceptor } from './interceptor/listPlan.interceptor';
import { UpdatePlanDto } from './dtos/updatePlan.dtos';

@Controller('membership')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Post('/add-plan')
  async addPlan(
    @Headers('authorization') token: string,
    @Body() newPlanDto: NewPlanDto,
  ) {
    return await this.membershipService.NewPlan(token, newPlanDto);
  }

  @Get('/plans')
  @UseInterceptors(listPlanInterceptor)
  async planList(@Headers('authorization') token: string) {
    return await this.membershipService.listPlans(token);
  }

  @Put('/update/:id')
  async updatePlans(
    @Headers('authorization') token: string,
    @Param('id') id: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    return await this.membershipService.updatePlan(token, id, updatePlanDto);
  }

  @Delete('/delete/:id')
  async deletePlan(
    @Headers('authorization') token: string,
    @Param('id') id: number,
  ) {
    return await this.membershipService.deletePlan(token, id);
  }
}
