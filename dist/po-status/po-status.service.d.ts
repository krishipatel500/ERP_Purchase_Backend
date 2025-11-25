import { PurchaseDetailDocument } from '../purchase-order/schemas/purchase-detail.schema';
import { Model } from 'mongoose';
export declare class PoStatusService {
    private detailModel;
    constructor(detailModel: Model<PurchaseDetailDocument>);
    getPoStatus(po_id: string): Promise<{
        po_id: string;
        po_sr: number;
        pro_id: string;
        po_qty: number;
        po_rec_qty: number;
        po_adj_qty: number;
        po_pending_qty: number;
    }[]>;
}
