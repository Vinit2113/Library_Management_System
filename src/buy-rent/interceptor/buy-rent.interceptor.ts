import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { buyRentExposeDto } from '../dtos/expose.dtos';

@Injectable()
export class BuyRentInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const transformedData = plainToInstance(buyRentExposeDto, data, {
          excludeExtraneousValues: false,
        });
        return transformedData;
      }),
    );
  }
}
