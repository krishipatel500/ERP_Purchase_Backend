import { Document } from 'mongoose';
export type GrnMasterDocument = GrnMaster & Document;
export declare class GrnMaster {
    grn_id: string;
    grn_date: Date;
    grn_no: string;
    sup_id: string;
    po_id: string;
}
export declare const GrnMasterSchema: import("mongoose").Schema<GrnMaster, import("mongoose").Model<GrnMaster, any, any, any, Document<unknown, any, GrnMaster, any, {}> & GrnMaster & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GrnMaster, Document<unknown, {}, import("mongoose").FlatRecord<GrnMaster>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<GrnMaster> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
