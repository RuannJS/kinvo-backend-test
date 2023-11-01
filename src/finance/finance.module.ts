import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceResolver } from './finance.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FinanceService, FinanceResolver],
  imports: [PrismaModule],
})
export class FinanceModule {}
