import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { listPlanDtos } from '../dtos/listPlan.dtos';

@Injectable()
export class listPlanInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const transformedData = plainToInstance(listPlanDtos, data, {
          excludeExtraneousValues: true,
        });
        return transformedData;
      }),
    );
  }
}
