import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ActionService } from './action.service';
import { Action } from './action.entity';
import { CreateActionInput } from './dto/create-action-input';
import { UserInterceptor } from 'src/interceptors/user/user.interceptor';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { UserDecorator } from 'src/decorators/user/user.decorator';

import { UserJwt } from 'src/models/user-jwt/user-jwt.interface';
import { UserGuard } from 'src/guards/user/user.guard';
import { UpdateActionInput } from './dto/update-action-input';

@Resolver()
export class ActionResolver {
  constructor(private readonly actionService: ActionService) {}

  @Mutation(() => Action)
  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  async createAction(
    @UserDecorator() user: UserJwt,
    @Args('data') data: CreateActionInput,
  ): Promise<Action> {
    const action = await this.actionService.createAction(user, data);

    return action;
  }

  @Mutation(() => Action)
  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  async updateAction(
    @UserDecorator() user: UserJwt,
    @Args('data') data: UpdateActionInput,
  ): Promise<Action> {
    const action = await this.actionService.updateAction(user, data);

    return action;
  }

  @Mutation(() => Boolean)
  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  async deleteAction(
    @UserDecorator() user: UserJwt,
    @Args('actionId') actionId: string,
  ): Promise<boolean> {
    const action = await this.actionService.deleteAction(user, actionId);

    return action;
  }
}
