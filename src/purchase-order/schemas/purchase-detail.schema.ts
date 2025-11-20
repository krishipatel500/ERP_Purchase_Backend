import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PurchaseDetailDocument = PurchaseDetail & Document;

@Schema({ collection: 'purchase_details_order', timestamps: true })
export class PurchaseDetail {
  @Prop({ required: true })
  po_id: string;

  @Prop({ required: true })
  po_sr: number;

  @Prop({ required: true })
  pro_id: string;

  @Prop({ required: true })
  po_qty: number;

  @Prop({ default: 0 })
  po_rec_qty: number;

  @Prop({ default: 0 })
  po_adj_qty: number;

  @Prop({ default: 0 })
  po_pending_qty: number;

  @Prop({ required: true })
  po_rate: number;

  @Prop({ required: true })
  po_sub_total: number;
}

export const PurchaseDetailSchema = SchemaFactory.createForClass(PurchaseDetail);
