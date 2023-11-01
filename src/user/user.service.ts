import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user-input';
import { Token, User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const verifyUserEmail = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (verifyUserEmail) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(data.password, 5);

    const user = await this.prismaService.user.create({
      data: { ...data, password: hashedPassword },
    });

    const userFinance = await this.prismaService.finance.create({
      data: {
        user_id: user.id,
      },
    });

    return user;
  }

  //   AUTH

  async loginUser(data: LoginUserInput): Promise<string> {
    const verifyUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (!verifyUser) {
      throw new UnauthorizedException('Something went wrong!');
    }

    if (verifyUser) {
      const hashedPassword = await bcrypt.compare(
        data.password,
        verifyUser.password,
      );

      if (!hashedPassword) {
        throw new UnauthorizedException('Something went wrong!');
      }
    }

    const token = jwt.sign({ data }, process.env.JWT_KEY);

    return `Bearer ${token}`;
  }
}
