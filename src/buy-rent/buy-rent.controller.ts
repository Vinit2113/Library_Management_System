import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { BuyRentService } from './buy-rent.service';
import { BuyRentDtos } from './dtos/buy-rent.dtos';
import { BuyRentInterceptor } from './interceptor/buy-rent.interceptor';

@Controller('buy-rent')
export class BuyRentController {
  constructor(private buyRentService: BuyRentService) {}

  @Post('/:bookId')
  @UseInterceptors(BuyRentInterceptor)
  async rentBuyBooks(
    @Headers('authorization') token: string,
    @Param('bookId') bookId: number,
    @Body() buyRentDto: BuyRentDtos,
  ) {
    return this.buyRentService.buyRentBooks(token, bookId, buyRentDto);
  }

  //   @Put('/returnBook/:bookId')
  //   async returnBook(
  //     @Headers('authorization') token: string,
  //     @Param('bookId') rentalId: number,
  //   ) {
  //     return await this.buyRentService.returnBook(token, rentalId);
  //   }
}
