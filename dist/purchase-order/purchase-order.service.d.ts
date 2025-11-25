import { Model } from 'mongoose';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { RevisionPurchaseOrderDto } from './dto/revision-purchase-order.dto';
import { PurchaseMasterDocument } from './schemas/purchase-master.schema';
import { PurchaseDetail, PurchaseDetailDocument } from './schemas/purchase-detail.schema';
export declare class PurchaseOrderService {
    private masterModel;
    private detailModel;
    constructor(masterModel: Model<PurchaseMasterDocument>, detailModel: Model<PurchaseDetailDocument>);
    create(createDto: CreatePurchaseOrderDto): Promise<{
        ok: boolean;
        po_id: string;
        po_amount: number;
    }>;
    revise(revDto: RevisionPurchaseOrderDto): Promise<{
        ok: boolean;
        old_po: string;
        new_po: string;
        revision: number;
        amount: number;
    }>;
    incrementRecQty(po_id: string, po_sr: number, qty: number): Promise<import("mongoose").Document<unknown, {}, PurchaseDetailDocument, {}, {}> & PurchaseDetail & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getDetailsByPoId(po_id: string): Promise<(import("mongoose").FlattenMaps<PurchaseDetailDocument> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
