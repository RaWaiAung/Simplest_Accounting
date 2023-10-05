import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './schema/invoice.schema';
import { InvoiceItem, InvoiceItemSchema } from './schema/invoice-item.schema';
import { Customer, CustomerSchema } from 'src/customer/schema/customer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
      {
        name: InvoiceItem.name,
        schema: InvoiceItemSchema,
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [AccountingController],
  providers: [AccountingService],
})
export class AccountingModule {}
