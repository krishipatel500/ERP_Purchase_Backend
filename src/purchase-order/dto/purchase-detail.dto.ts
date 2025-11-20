import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PurchaseDetailDto {
  @IsNumber()
  po_sr: number;

  @IsString()
  pro_id: string;

  @IsNumber()
  @Min(0)
  po_qty: number;

  @IsNumber()
  @Min(0)
  po_rate: number;

  // NEW FIELDS added to prevent "never" errors — optional
  po_rec_qty?: number;
  po_adj_qty?: number;
  po_pending_qty?: number;
  po_sub_total?: number;
}

