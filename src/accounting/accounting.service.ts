import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice } from './schema/invoice.schema';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceItem } from './schema/invoice-item.schema';
import { Customer } from 'src/customer/schema/customer.schema';

@Injectable()
export class AccountingService {
  constructor(
    @InjectModel(Invoice.name) private readonly invoiceModel: Model<Invoice>,
    @InjectModel(InvoiceItem.name)
    private readonly invoiceItemModel: Model<InvoiceItem>,
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}
  async createInvoice(createIvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { customer_name, customer_phone, invoice_date, obj_items } =
      createIvoiceDto;
    const invoiceItems = await this.createInvoiceItems(obj_items);
    const customer = await this.createOrFindCustomer({
      name: customer_name,
      phone: customer_phone,
    });
    return await this.invoiceModel.create({
      invoice_date,
      obj_items: invoiceItems,
      obj_customer: customer,
    });
  }

  async getAllInvoices(): Promise<Invoice[]> {
    return this.invoiceModel
      .find()
      .populate('obj_items')
      .populate('obj_customer')
      .exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} accounting`;
  }

  update(id: number) {
    return `This action updates a #${id} accounting`;
  }

  remove(id: number) {
    return `This action removes a #${id} accounting`;
  }

  //create customer
  private async createOrFindCustomer(customerData: {
    name: string;
    phone: string;
  }): Promise<Customer> {
    const customer = await this.customerModel
      .findOne({ phone: customerData.phone })
      .exec();
    if (customer) {
      return customer;
    }
    return await this.customerModel.create(customerData);
  }

  private async createInvoiceItems(
    invoiceItemData: [
      { good_name: string; good_amount: number; good_price: number },
    ],
  ): Promise<InvoiceItem[]> {
    return await this.invoiceItemModel.create(invoiceItemData);
  }
}
