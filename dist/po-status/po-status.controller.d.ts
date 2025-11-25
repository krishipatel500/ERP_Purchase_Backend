import { PoStatusService } from './po-status.service';
export declare class PoStatusController {
    private readonly poStatusService;
    constructor(poStatusService: PoStatusService);
    getStatus(po_id: string): Promise<{
        po_id: string;
        po_sr: number;
        pro_id: string;
        po_qty: number;
        po_rec_qty: number;
        po_adj_qty: number;
        po_pending_qty: number;
    }[]>;
}
