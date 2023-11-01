import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { Action } from 'src/action/action.entity';

import { UserJwt } from 'src/models/user-jwt/user-jwt.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Balance } from './finance.entity';

@Injectable()
export class FinanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUser(uniqueIdentifier: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: uniqueIdentifier,
      },
      select: { finance: true, id: true },
    });

    return user;
  }

  async listFinance(user: UserJwt, pageNumber: number): Promise<Action[]> {
    const foundUser = await this.findUser(user.data.email);

    const userFinance = await this.prismaService.finance.findUnique({
      where: {
        user_id: foundUser.id,
      },
    });

    if (!userFinance) {
      throw new HttpException(
        'User Finance was not found',
        HttpStatus.NO_CONTENT,
      );
    }

    const pageSize: number = 10;

    const userActions = await this.prismaService.action.findMany({
      where: {
        finance_id: userFinance.id,
      },
      orderBy: {
        updated_at: 'asc',
      },
      //   WILL SKIP THE *CURSOR* AMOUNT OF DATA AND TAKE NEXT 10
      skip: pageNumber * pageSize,
      take: pageSize,
    });

    return userActions;
  }

  async financeBalance(user: UserJwt): Promise<Balance> {
    const foundUser = await this.findUser(user.data.email);

    const userFinance = await this.prismaService.finance.findUnique({
      where: {
        user_id: foundUser.id,
      },
      select: {
        actions: true,
      },
    });

    if (!userFinance) {
      throw new HttpException(
        'User Finance was not found',
        HttpStatus.NO_CONTENT,
      );
    }

    const expenseValues: number[] = [];
    const incomeValues: number[] = [];

    userFinance.actions.map((action) => {
      if (action.type === 'expense') {
        expenseValues.push(action.value);
      } else if (action.type === 'income') {
        incomeValues.push(action.value);
      }
    });

    const initialExpense: number = 0;
    const expenseSum = expenseValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialExpense,
    );

    const initialIncome: number = 0;
    const incomeSum = incomeValues.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialIncome,
    );

    return { balance: incomeSum - expenseSum };
  }
}
