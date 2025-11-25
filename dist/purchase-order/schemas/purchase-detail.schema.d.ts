import { Document } from 'mongoose';
export type PurchaseDetailDocument = PurchaseDetail & Document;
export declare class PurchaseDetail {
    po_id: string;
    po_sr: number;
    pro_id: string;
    po_qty: number;
    po_rec_qty: number;
    po_adj_qty: number;
    po_pending_qty: number;
    po_rate: number;
    po_sub_total: number;
}
export declare const PurchaseDetailSchema: import("mongoose").Schema<PurchaseDetail, import("mongoose").Model<PurchaseDetail, any, any, any, Document<unknown, any, PurchaseDetail, any, {}> & PurchaseDetail & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurchaseDetail, Document<unknown, {}, import("mongoose").FlatRecord<PurchaseDetail>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PurchaseDetail> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
