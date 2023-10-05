import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Invoice } from 'src/accounting/schema/invoice.schema';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({
  toObject: {
    versionKey: false,
  },
  toJSON: {
    versionKey: false,
  },
})
export class Customer {
  @Prop()
  name: string;
  @Prop({ unique: true })
  phone: string;
  //Add one-to-many relation to InvoiceSchema
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Invoice' }] })
  obj_invoices: [Invoice];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
