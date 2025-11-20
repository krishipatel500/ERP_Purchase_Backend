import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseDetailDto } from './purchase-detail.dto';

export class RevisionPurchaseOrderDto {
  @IsString()
  po_id: string;

  @IsDateString()
  po_date: string;

  @IsString()
  po_no: string;

  @IsString()
  po_rev_reason: string;

  @IsString()
  sup_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseDetailDto)
  details: PurchaseDetailDto[];
}
