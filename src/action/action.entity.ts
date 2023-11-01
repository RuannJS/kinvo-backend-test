import {
  ObjectType,
  ID,
  Field,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { ActionType } from '@prisma/client';

@ObjectType()
export class Action {
  @Field((type) => ID)
  id: string;

  @Field((type) => String)
  description: string;

  @Field((type) => Float)
  value: number;

  @Field((type) => String)
  type: ActionType;

  @Field((type) => GraphQLISODateTime)
  created_at: Date;

  @Field((type) => GraphQLISODateTime, { nullable: true })
  updated_at: Date;
}
