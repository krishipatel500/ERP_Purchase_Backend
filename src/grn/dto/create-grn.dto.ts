import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class GrnDetailDto {
  @IsNumber()
  grn_sr: number;

  @IsNumber()
  po_sr: number;

  @IsNumber()
  grn_rec_qty: number;
}

export class CreateGrnDto {
  @IsString()
  grn_id: string;

  @IsDateString()
  grn_date: string;

  @IsString()
  grn_no: string;

  @IsString()
  sup_id: string;

  @IsString()
  po_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrnDetailDto)
  details: GrnDetailDto[];
}
