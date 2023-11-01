import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;

    const { headers } = request;

    const token = headers?.authorization?.split(' ')[1];

    if (token === undefined) {
      return false;
    }

    try {
      jwt.verify(token, process.env.JWT_KEY);

      return true;
    } catch (err) {
      return false;
    }
  }
}
