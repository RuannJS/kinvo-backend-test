import { Field, Float, InputType } from '@nestjs/graphql';
import { ActionType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateActionInput {
  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Field((type) => Float)
  value: number;

  @IsEnum(ActionType)
  @IsNotEmpty()
  @Field((type) => String)
  type: ActionType;
}
