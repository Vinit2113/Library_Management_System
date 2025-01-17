import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { listBookDtos } from '../Dtos/listBooks.dto';

@Injectable()
export class listBooksInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const transformedData = plainToInstance(listBookDtos, data, {
          excludeExtraneousValues: true,
        });
        return transformedData;
      }),
    );
  }
}
