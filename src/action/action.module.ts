import { Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionResolver } from './action.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ActionService, ActionResolver],
  imports: [PrismaModule],
})
export class ActionModule {}
