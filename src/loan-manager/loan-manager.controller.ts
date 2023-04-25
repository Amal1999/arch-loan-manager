import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('loan-manager')
export class LoanManagerController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }

  @Post('/loan-process')
  async loanProcess(@Body() body: any) {
    /// Loan application and OCR (localhost:3000 to be replaced with the URL)
    const result = await lastValueFrom(
      this.client.send('localhost:3000/loan-application', body),
    );

    // /// Commercial service
    // const result1 = await lastValueFrom(
    //   this.client.send('localhost:3002/check-eligibility', {}),
    // );
    //
    // /// Risk management service
    // const result2 = await lastValueFrom(
    //   this.client.send('localhost:3003/check-ratio', {}),
    // );
    //
    // /// Credit service
    // if(result1 && result2)
    // const result3 = await lastValueFrom(
    //   this.client.send('localhost:3003/generate-agreement', {}),
    // );
    return result;
  }
}
