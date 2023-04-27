import {
  Controller,
  Post,
  Body,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('loan-manager')
export class LoanManagerController {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({});
  }

  @Get()
  hey() {
    return 'heeeyyyy';
  }
  @Post('/loan-process')
  @UseInterceptors(FileInterceptor('file'))
  async loanProcess(@UploadedFile() file, @Body() body) {
    /// Loan application and OCR (localhost:3000 to be replaced with the URL)

    body = JSON.stringify(body);

    console.log(file);
    console.log(body);
    const result = await this.client.send(
      'https://localhost:3000/loan-application',
      {
        file,
        ...body,
      },
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
