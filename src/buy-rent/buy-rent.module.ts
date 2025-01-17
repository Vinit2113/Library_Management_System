import { Module } from '@nestjs/common';
import { BuyRentService } from './buy-rent.service';
import { BuyRentController } from './buy-rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuyRent } from './buy-rent.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([BuyRent]), AuthModule, BooksModule],
  providers: [BuyRentService],
  controllers: [BuyRentController],
  exports: [BuyRentService],
})
export class BuyRentModule {}
