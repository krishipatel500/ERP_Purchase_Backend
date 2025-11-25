import { Document, Types } from 'mongoose';
export type PurchaseMasterDocument = PurchaseMaster & Document;
export declare class PurchaseMaster {
    po_id: string;
    po_date: Date;
    po_no: string;
    po_rev: number;
    po_rev_reason: string;
    po_is_active: boolean;
    po_amount: number;
    sup_id: string;
}
export declare const PurchaseMasterSchema: import("mongoose").Schema<PurchaseMaster, import("mongoose").Model<PurchaseMaster, any, any, any, Document<unknown, any, PurchaseMaster, any, {}> & PurchaseMaster & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurchaseMaster, Document<unknown, {}, import("mongoose").FlatRecord<PurchaseMaster>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PurchaseMaster> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
