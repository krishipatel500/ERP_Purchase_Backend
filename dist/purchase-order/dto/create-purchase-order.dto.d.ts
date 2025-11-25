import { PurchaseDetailDto } from './purchase-detail.dto';
export declare class CreatePurchaseOrderDto {
    po_id: string;
    po_date: string;
    po_no: string;
    sup_id: string;
    details: PurchaseDetailDto[];
}
