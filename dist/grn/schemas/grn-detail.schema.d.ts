import { Document } from 'mongoose';
export type GrnDetailDocument = GrnDetail & Document;
export declare class GrnDetail {
    grn_id: string;
    grn_sr: number;
    po_id: string;
    po_sr: number;
    grn_rec_qty: number;
}
export declare const GrnDetailSchema: import("mongoose").Schema<GrnDetail, import("mongoose").Model<GrnDetail, any, any, any, Document<unknown, any, GrnDetail, any, {}> & GrnDetail & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GrnDetail, Document<unknown, {}, import("mongoose").FlatRecord<GrnDetail>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<GrnDetail> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
