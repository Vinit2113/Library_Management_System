import {
  ConflictException,
  Injectable,
  //  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyRent } from './buy-rent.entity';
import { Repository } from 'typeorm';
import { BuyRentDtos } from './dtos/buy-rent.dtos';
import { AuthService } from 'src/auth/auth.service';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class BuyRentService {
  constructor(
    @InjectRepository(BuyRent)
    private buyRentRepsitory: Repository<BuyRent>,
    private authService: AuthService,
    private bookService: BooksService,
  ) {}

  async buyRentBooks(
    token: string,
    bookId: number,
    buyRentDtos: BuyRentDtos,
  ): Promise<BuyRent> {
    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const existingRental = await this.buyRentRepsitory.findOne({
      where: { user_id: decodedToken.userId, books_id: bookId, status: 1 },
    });
    if (existingRental) {
      throw new ConflictException('You already have rented books');
    }

    const { cost, id } = await this.bookService.BookCostAndId(bookId);
    const _Buy_Rent_ = new BuyRent();
    _Buy_Rent_.user_id = decodedToken.userId;
    _Buy_Rent_.books_id = id;

    if (buyRentDtos.rent) {
      const rentedPrice = cost * 0.1 * buyRentDtos.totalDaysRented;
      _Buy_Rent_.rent = 1;
      _Buy_Rent_.totalDaysRented = buyRentDtos.totalDaysRented;
      _Buy_Rent_.cost = rentedPrice;
      _Buy_Rent_.returnDate = new Date(
        Date.now() + buyRentDtos.totalDaysRented * 24 * 60 * 60 * 1000,
      );
    } else {
      _Buy_Rent_.rent = 0;
      _Buy_Rent_.cost = cost;
    }

    // const penalty = 100;
    return await this.buyRentRepsitory.save(_Buy_Rent_);
  }

  //   async returnBook(token: string, bookId: number) {
  //     const decodedToken = await this.authService.validateToken(token);
  //     if (!decodedToken) {
  //       throw new UnauthorizedException('You cannot enter!');
  //     }
  //     const rental = await this.buyRentRepsitory.findOne({
  //       where: { user_id: decodedToken.userId, status: 1, books_id: bookId },
  //     });

  //     if (!rental) {
  //       throw new NotFoundException('Rental not found');
  //     }
  //     const today = new Date();
  //     let overdueDays = 0;
  //     if (rental.returnDate < today) {
  //       rental.status = 3;
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       overdueDays = Math.ceil(today.getTime() - rental.returnDate.getTime());
  //     } else {
  //       rental.status = 2;
  //     }
  //   }
}
