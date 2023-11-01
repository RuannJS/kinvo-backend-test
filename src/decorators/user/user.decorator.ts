import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { UserJwt } from 'src/models/user-jwt/user-jwt.interface';

export const UserDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = GqlExecutionContext.create(context).getContext().req;

    const { token } = request;

    const user = jwt.verify(token, process.env.JWT_KEY) as UserJwt;

    return user;
  },
);
