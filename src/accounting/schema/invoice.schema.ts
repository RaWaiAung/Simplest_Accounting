import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customer/schema/customer.schema';
import { InvoiceItem } from './invoice-item.schema';

export type InvoiceDocument = HydratedDocument<Invoice>;

@Schema({
  toObject: {
    //delete __v from output object
    versionKey: false,
    transform: function (doc, ret) {
      const year = ret.invoice_date.getFullYear();
      const month = ret.invoice_date.getMonth();
      const day = ret.invoice_date.getDate();
      ret.date_of_invoice = `${year}-${month + 1}-${day}`;
      const h = ret.invoice_date.getHours();
      const m = ret.invoice_date.getMinutes();
      const s = ret.invoice_date.getSeconds();
      ret.time_of_invoice = `${h}:${m}:${s}`;
      delete ret.invoice_date;
      return ret;
    },
    // virtual props
    virtuals: ['total'],
  },
  toJSON: {
    //delete __v from output JSON
    versionKey: false,
    transform: function (doc, ret) {
      const year = ret.invoice_date.getFullYear();
      const month = ret.invoice_date.getMonth();
      const day = ret.invoice_date.getDate();
      ret.date_of_invoice = `${year}-${month + 1}-${day}`;
      const h = ret.invoice_date.getHours();
      const m = ret.invoice_date.getMinutes();
      const s = ret.invoice_date.getSeconds();
      ret.time_of_invoice = `${h}:${m}:${s}`;

      delete ret.invoice_date;
      return ret;
    },
    // virtual props
    virtuals: ['total'],
  },
})
export class Invoice {
  @Prop({ type: Date })
  invoice_date: Date;
  // (ManyToOne relation)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Customer' })
  obj_customer: Customer;
  //   @Prop(
  //     raw([
  //       {
  //         good_name: String,
  //         good_price: Number,
  //         good_amount: Number,
  //       },
  //     ]),
  //   )
  //   obj_items: Record<string, any>[];
  // (OneToMany relation)
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'InvoiceItem' }] })
  obj_items: [InvoiceItem];
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);

InvoiceSchema.virtual('total').get(function () {
  let total = 0;

  for (const item of this.obj_items) {
    total += item.good_amount * item.good_price;
  }
  return total.toFixed(4);
});
