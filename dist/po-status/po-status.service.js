"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoStatusService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_detail_schema_1 = require("../purchase-order/schemas/purchase-detail.schema");
const mongoose_2 = require("mongoose");
let PoStatusService = class PoStatusService {
    constructor(detailModel) {
        this.detailModel = detailModel;
    }
    async getPoStatus(po_id) {
        const rows = await this.detailModel.find({ po_id }).sort({ po_sr: 1 }).lean();
        if (!rows || rows.length === 0) {
            throw new common_1.NotFoundException('PO details not found');
        }
        const items = rows.map((r) => {
            const po_qty = Number(r.po_qty);
            const po_rec_qty = Number(r.po_rec_qty || 0);
            const po_adj_qty = Number(r.po_adj_qty || 0);
            const po_pending_qty = Number((po_qty - (po_rec_qty + po_adj_qty)).toFixed(2));
            return {
                po_id: r.po_id,
                po_sr: r.po_sr,
                pro_id: r.pro_id,
                po_qty,
                po_rec_qty,
                po_adj_qty,
                po_pending_qty,
            };
        });
        return items;
    }
};
exports.PoStatusService = PoStatusService;
exports.PoStatusService = PoStatusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(purchase_detail_schema_1.PurchaseDetail.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PoStatusService);
//# sourceMappingURL=po-status.service.js.map