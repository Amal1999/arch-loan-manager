import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoanManagerModule } from './loan-manager/loan-manager.module';

@Module({
  imports: [LoanManagerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
