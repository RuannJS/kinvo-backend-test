import { Args, Resolver } from '@nestjs/graphql';
import { FinanceService } from './finance.service';
import { UserJwt } from 'src/models/user-jwt/user-jwt.interface';
import { Action } from 'src/action/action.entity';
import { Query } from '@nestjs/graphql';
import { UserGuard } from 'src/guards/user/user.guard';
import { UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { UserInterceptor } from 'src/interceptors/user/user.interceptor';
import { UserDecorator } from 'src/decorators/user/user.decorator';
import { Balance } from './finance.entity';

@Resolver()
export class FinanceResolver {
  constructor(private readonly financeService: FinanceService) {}

  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  @Query((type) => [Action])
  async listFinance(
    @UserDecorator() user: UserJwt,
    @Args('pageNumber') pageNumber: number,
  ): Promise<Action[]> {
    const actions = await this.financeService.listFinance(user, pageNumber);

    return actions;
  }

  @UseGuards(UserGuard)
  @UseInterceptors(UserInterceptor)
  @Query((type) => Balance)
  async financeBalance(@UserDecorator() user: UserJwt): Promise<Balance> {
    const balance = await this.financeService.financeBalance(user);

    return balance;
  }
}
