import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PurchaseMasterDocument = PurchaseMaster & Document;

@Schema({ collection: 'purchase_master_order', timestamps: true })
export class PurchaseMaster {
  @Prop({ required: true, unique: true })
  po_id: string; // business id (could be generated)

  @Prop({ required: true })
  po_date: Date;

  @Prop({ required: true })
  po_no: string;

  @Prop({ default: 0 })
  po_rev: number;

//   @Prop({ default: null })
//   po_rev_reason: string | null;


  //  THIS IS THE FIX
  @Prop({ type: String, default: '' })
  po_rev_reason: string;


  @Prop({ default: true })
  po_is_active: boolean;

  @Prop({ default: 0 })
  po_amount: number;

  @Prop({ required: true })
  sup_id: string;
}

export const PurchaseMasterSchema = SchemaFactory.createForClass(PurchaseMaster);
