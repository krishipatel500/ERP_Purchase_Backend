import { GrnMasterDocument } from './schemas/grn-master.schema';
import { GrnDetailDocument } from './schemas/grn-detail.schema';
import { Model } from 'mongoose';
import { CreateGrnDto } from './dto/create-grn.dto';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
export declare class GrnService {
    private grnMasterModel;
    private grnDetailModel;
    private readonly poService;
    constructor(grnMasterModel: Model<GrnMasterDocument>, grnDetailModel: Model<GrnDetailDocument>, poService: PurchaseOrderService);
    create(createDto: CreateGrnDto): Promise<{
        ok: boolean;
        grn_id: string;
    }>;
}
