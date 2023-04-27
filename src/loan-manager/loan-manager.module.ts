import { Module } from '@nestjs/common';
import { LoanManagerController } from './loan-manager.controller';

@Module({
  controllers: [LoanManagerController],
})
export class LoanManagerModule {}
