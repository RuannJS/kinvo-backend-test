import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserJwt } from 'src/models/user-jwt/user-jwt.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActionInput } from './dto/create-action-input';
import { Action } from './action.entity';
import { UpdateActionInput } from './dto/update-action-input';

@Injectable()
export class ActionService {
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

  async createAction(user: UserJwt, data: CreateActionInput): Promise<Action> {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    const userFound = await this.findUser(user.data.email);

    const userFinance = userFound.finance.id;

    const action = await this.prismaService.action.create({
      data: {
        description: data.description,
        value: data.value,
        type: data.type,
        finance_id: userFinance,
        created_at: today,
      },
    });

    return action;
  }

  async updateAction(user: UserJwt, data: UpdateActionInput): Promise<Action> {
    const userFound = await this.findUser(user.data.email);

    const actionFound = await this.prismaService.action.findUnique({
      select: { finance: true, id: true },
      where: { id: data.actionId },
    });

    if (userFound.finance.id !== actionFound.finance.id) {
      throw new UnauthorizedException();
    }

    const action = await this.prismaService.action.update({
      data: {
        type: data.type,
        value: data.value,
        description: data.description,
      },
      where: {
        id: data.actionId,
      },
    });

    return action;
  }

  async deleteAction(user: UserJwt, actionId: string): Promise<boolean> {
    const userFound = await this.findUser(user.data.email);

    const actionFound = await this.prismaService.action.findUnique({
      select: { finance: true, id: true },
      where: { id: actionId },
    });

    if (userFound.finance.id !== actionFound.finance.id) {
      throw new UnauthorizedException();
    }

    const deleted = await this.prismaService.action.delete({
      where: {
        id: actionId,
      },
    });

    if (!deleted) {
      return false;
    }

    return true;
  }
}
