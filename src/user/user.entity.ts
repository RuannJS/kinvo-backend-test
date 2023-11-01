import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Finance } from 'src/finance/finance.entity';

@ObjectType()
export class User {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  first_name: string;

  @Field((type) => String)
  last_name: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  password: string;

  @Field((type) => Finance, { nullable: true })
  finances?: Finance;
}

@ObjectType()
export class Token {
  @Field((type) => String)
  token: string;
}
