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
  async facadeApi(@Body() body: any) {
    /// Loan application and OCR
    const result = await lastValueFrom(
      this.client.send('underlying-microservice', body),
    );

    /// Commercial service
    const result1 = await lastValueFrom(
      this.client.send('underlying-microservice', body),
    );

    /// Risk management service
    const result2 = await lastValueFrom(
      this.client.send('underlying-microservice', body),
    );

    /// Credit service
    const result3 = await lastValueFrom(
      this.client.send('underlying-microservice', body),
    );
    return result;
  }
}
