import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GrnDetailDocument = GrnDetail & Document;

@Schema({ collection: 'grn_details', timestamps: true })
export class GrnDetail {
  @Prop({ required: true })
  grn_id: string;

  @Prop({ required: true })
  grn_sr: number;

  @Prop({ required: true })
  po_id: string;

  @Prop({ required: true })
  po_sr: number;

  @Prop({ required: true })
  grn_rec_qty: number;
}

export const GrnDetailSchema = SchemaFactory.createForClass(GrnDetail);
