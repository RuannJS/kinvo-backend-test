import { Test, TestingModule } from '@nestjs/testing';
import { FinanceResolver } from './finance.resolver';

describe('FinanceResolver', () => {
  let resolver: FinanceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinanceResolver],
    }).compile();

    resolver = module.get<FinanceResolver>(FinanceResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
