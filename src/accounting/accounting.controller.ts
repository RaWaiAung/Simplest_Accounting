import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Invoice } from './schema/invoice.schema';

@Controller('accounting')
export class AccountingController {
  constructor(private readonly accountingService: AccountingService) {}

  @Post('invoice')
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.accountingService.createInvoice(createInvoiceDto);
  }

  @Get('invoice/all')
  getAllInvoices(): Promise<Invoice[]> {
    return this.accountingService.getAllInvoices();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.accountingService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountingService.remove(+id);
  }
}
