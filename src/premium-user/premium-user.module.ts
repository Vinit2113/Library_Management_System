import { Module } from '@nestjs/common';
import { PremiumUserService } from './premium-user.service';
import { PremiumUserController } from './premium-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PremiumsUser } from './premium-user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PremiumsUser]),
    AuthModule,
    MembershipModule,
  ],
  providers: [PremiumUserService],
  controllers: [PremiumUserController],
  exports: [PremiumUserService],
})
export class PremiumUserModule {}
