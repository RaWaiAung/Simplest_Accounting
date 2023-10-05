export class CreateInvoiceDto {
  invoice_date: Date;
  customer_name: string;
  customer_phone: string;
  obj_items: [
    {
      good_name: string;
      good_price: number;
      good_amount: number;
    },
  ];
}
