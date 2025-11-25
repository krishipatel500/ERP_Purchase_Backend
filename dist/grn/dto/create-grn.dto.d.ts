declare class GrnDetailDto {
    grn_sr: number;
    po_sr: number;
    grn_rec_qty: number;
}
export declare class CreateGrnDto {
    grn_id: string;
    grn_date: string;
    grn_no: string;
    sup_id: string;
    po_id: string;
    details: GrnDetailDto[];
}
export {};
