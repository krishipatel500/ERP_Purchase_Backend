import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { RevisionPurchaseOrderDto } from './dto/revision-purchase-order.dto';
export declare class PurchaseOrderController {
    private readonly poService;
    constructor(poService: PurchaseOrderService);
    createPO(dto: CreatePurchaseOrderDto): Promise<{
        ok: boolean;
        po_id: string;
        po_amount: number;
    }>;
    revisePO(dto: RevisionPurchaseOrderDto): Promise<{
        ok: boolean;
        old_po: string;
        new_po: string;
        revision: number;
        amount: number;
    }>;
}
