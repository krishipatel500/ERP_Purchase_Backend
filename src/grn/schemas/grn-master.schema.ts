import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GrnMasterDocument = GrnMaster & Document;

@Schema({ collection: 'grn_master', timestamps: true })
export class GrnMaster {
  @Prop({ required: true, unique: true })
  grn_id: string;

  @Prop({ required: true })
  grn_date: Date;

  @Prop({ required: true })
  grn_no: string;

  @Prop({ required: true })
  sup_id: string;

  @Prop({ required: true })
  po_id: string;
}

export const GrnMasterSchema = SchemaFactory.createForClass(GrnMaster);
