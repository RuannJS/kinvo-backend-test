import { ObjectType, ID, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Action } from 'src/action/action.entity';

@ObjectType()
export class Finance {
  @Field((type) => ID)
  id: string;

  @Field((type) => [Action])
  actions: Action[];

  @Field((type) => User)
  user: User;
}

@ObjectType()
export class Balance {
  @Field((type) => Number)
  balance: number;
}
