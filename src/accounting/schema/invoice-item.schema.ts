import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Invoice } from './invoice.schema';

export type InvoiceItemDocument = HydratedDocument<InvoiceItem>;

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class InvoiceItem {
  @Prop()
  good_name: string;
  @Prop()
  good_amount: number;
  @Prop()
  good_price: number;
  //Every InvoiceItem belongs to an Invoice (ManyToOne relation)
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Invoice' })
  obj_invoice: Invoice;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
