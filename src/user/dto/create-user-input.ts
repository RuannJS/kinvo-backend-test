import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  last_name: string;

  @IsEmail()
  @Field((type) => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  password: string;
}
