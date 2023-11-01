import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = GqlExecutionContext.create(context).getContext().req;

    const { headers } = request;

    const token = headers?.authorization?.split(' ')[1];

    request.token = token;

    return next.handle();
  }
}
