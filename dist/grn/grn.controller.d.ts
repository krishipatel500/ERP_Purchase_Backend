import { GrnService } from './grn.service';
import { CreateGrnDto } from './dto/create-grn.dto';
export declare class GrnController {
    private readonly grnService;
    constructor(grnService: GrnService);
    createGRN(dto: CreateGrnDto): Promise<{
        ok: boolean;
        grn_id: string;
    }>;
}
