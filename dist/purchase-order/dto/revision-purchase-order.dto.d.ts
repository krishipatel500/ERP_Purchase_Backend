import { PurchaseDetailDto } from './purchase-detail.dto';
export declare class RevisionPurchaseOrderDto {
    po_id: string;
    po_date: string;
    po_no: string;
    po_rev_reason: string;
    sup_id: string;
    details: PurchaseDetailDto[];
}
