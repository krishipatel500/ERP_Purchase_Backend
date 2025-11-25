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
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const purchase_master_schema_1 = require("./schemas/purchase-master.schema");
const purchase_detail_schema_1 = require("./schemas/purchase-detail.schema");
let PurchaseOrderService = class PurchaseOrderService {
    constructor(masterModel, detailModel) {
        this.masterModel = masterModel;
        this.detailModel = detailModel;
    }
    async create(createDto) {
        const { po_id, po_date, po_no, sup_id, details } = createDto;
        if (!details || details.length === 0) {
            throw new common_1.BadRequestException('details are required');
        }
        let totalAmount = 0;
        const detailsToInsert = details.map((d) => {
            const sub = Number((d.po_qty * d.po_rate).toFixed(2));
            totalAmount += sub;
            return {
                po_id,
                po_sr: d.po_sr,
                pro_id: d.pro_id,
                po_qty: d.po_qty,
                po_rec_qty: 0,
                po_adj_qty: 0,
                po_pending_qty: d.po_qty,
                po_rate: d.po_rate,
                po_sub_total: sub,
            };
        });
        const exists = await this.masterModel.findOne({ po_id });
        if (exists)
            throw new common_1.BadRequestException('po_id already exists');
        const master = new this.masterModel({
            po_id,
            po_date: new Date(po_date),
            po_no,
            sup_id,
            po_rev: 0,
            po_rev_reason: null,
            po_is_active: true,
            po_amount: Number(totalAmount.toFixed(2)),
        });
        await master.save();
        await this.detailModel.insertMany(detailsToInsert);
        return { ok: true, po_id, po_amount: master.po_amount };
    }
    async revise(revDto) {
        const { po_id, po_date, po_no, po_rev_reason, sup_id, details } = revDto;
        const oldMaster = await this.masterModel.findOne({ po_id });
        if (!oldMaster)
            throw new common_1.NotFoundException('PO not found');
        const oldDetails = await this.detailModel.find({ po_id }).lean();
        oldMaster.po_is_active = false;
        await oldMaster.save();
        for (const row of oldDetails) {
            const adj = row.po_qty - row.po_rec_qty;
            await this.detailModel.findByIdAndUpdate(row._id, {
                $set: {
                    po_adj_qty: adj,
                    po_pending_qty: 0,
                },
            });
        }
        const newRevNo = (oldMaster.po_rev || 0) + 1;
        const newPoId = `${po_id}-R${newRevNo}`;
        const newMaster = new this.masterModel({
            po_id: newPoId,
            po_date: new Date(po_date),
            po_no,
            sup_id,
            po_rev: newRevNo,
            po_rev_reason,
            po_is_active: true,
            po_prev_id: po_id,
        });
        await newMaster.save();
        let totalAmount = 0;
        const newDetailRows = [];
        for (const item of details) {
            const oldRow = oldDetails.find((d) => d.po_sr === item.po_sr);
            const carriedRecQty = 0;
            const sub = Number((item.po_qty * item.po_rate).toFixed(2));
            totalAmount += sub;
            newDetailRows.push({
                po_id: newPoId,
                po_sr: item.po_sr,
                pro_id: item.pro_id,
                po_qty: item.po_qty,
                po_rate: item.po_rate,
                po_sub_total: sub,
                po_rec_qty: 0,
                po_adj_qty: 0,
                po_pending_qty: item.po_qty,
            });
        }
        await this.detailModel.insertMany(newDetailRows);
        newMaster.po_amount = Number(totalAmount.toFixed(2));
        await newMaster.save();
        return {
            ok: true,
            old_po: po_id,
            new_po: newPoId,
            revision: newRevNo,
            amount: newMaster.po_amount,
        };
    }
    async incrementRecQty(po_id, po_sr, qty) {
        const updated = await this.detailModel.findOneAndUpdate({ po_id, po_sr }, { $inc: { po_rec_qty: qty } }, { new: true });
        if (!updated) {
            throw new common_1.NotFoundException(`PO detail not found for ${po_id} SR ${po_sr}`);
        }
        const pending = updated.po_qty - updated.po_rec_qty;
        updated.po_pending_qty = pending;
        await updated.save();
        return updated;
    }
    async getDetailsByPoId(po_id) {
        return this.detailModel.find({ po_id }).sort({ po_sr: 1 }).lean();
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(purchase_master_schema_1.PurchaseMaster.name)),
    __param(1, (0, mongoose_1.InjectModel)(purchase_detail_schema_1.PurchaseDetail.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PurchaseOrderService);
//# sourceMappingURL=purchase-order.service.js.map