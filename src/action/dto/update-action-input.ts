import { Field, Float, InputType } from '@nestjs/graphql';
import { ActionType } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateActionInput {
  @IsString()
  @IsOptional()
  @Field((type) => String, { nullable: true })
  description: string;

  @IsNumber()
  @IsOptional()
  @Field((type) => Float, { nullable: true })
  value?: number;

  @IsEnum(ActionType)
  @IsOptional()
  @Field((type) => String, { nullable: true })
  type?: ActionType;

  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  actionId: string;
}
