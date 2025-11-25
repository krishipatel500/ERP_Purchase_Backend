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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseMasterSchema = exports.PurchaseMaster = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PurchaseMaster = class PurchaseMaster {
};
exports.PurchaseMaster = PurchaseMaster;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], PurchaseMaster.prototype, "po_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], PurchaseMaster.prototype, "po_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PurchaseMaster.prototype, "po_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PurchaseMaster.prototype, "po_rev", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '' }),
    __metadata("design:type", String)
], PurchaseMaster.prototype, "po_rev_reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], PurchaseMaster.prototype, "po_is_active", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], PurchaseMaster.prototype, "po_amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PurchaseMaster.prototype, "sup_id", void 0);
exports.PurchaseMaster = PurchaseMaster = __decorate([
    (0, mongoose_1.Schema)({ collection: 'purchase_master_order', timestamps: true })
], PurchaseMaster);
exports.PurchaseMasterSchema = mongoose_1.SchemaFactory.createForClass(PurchaseMaster);
//# sourceMappingURL=purchase-master.schema.js.map