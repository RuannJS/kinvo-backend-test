import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user-input';
import { Token, User } from './user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginUserInput } from './dto/login-user-input';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //   QUERIES

  @Query(() => [User])
  async findAllUsers(): Promise<User[]> {
    const users = await this.userService.findAllUsers();

    return users;
  }

  @Query(() => Token)
  async loginUser(@Args('data') data: LoginUserInput): Promise<Token> {
    const token = await this.userService.loginUser(data);

    return { token };
  }

  // MUTATIONS

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.userService.createUser(data);
  }
}
