import { Test, TestingModule } from '@nestjs/testing';
import { LoanManagerController } from './loan-manager.controller';

describe('LoanManagerController', () => {
  let controller: LoanManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanManagerController],
    }).compile();

    controller = module.get<LoanManagerController>(LoanManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
