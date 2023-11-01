import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [PrismaModule],
})
export class UserModule {}
