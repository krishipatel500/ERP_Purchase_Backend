import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseDetailDto } from './purchase-detail.dto';

export class CreatePurchaseOrderDto {
  @IsString()
  po_id: string;

  @IsDateString()
  po_date: string;

  @IsString()
  po_no: string;

  @IsString()
  sup_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseDetailDto)
  details: PurchaseDetailDto[];
}
