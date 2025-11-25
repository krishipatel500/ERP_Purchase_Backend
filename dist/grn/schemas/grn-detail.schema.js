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
exports.GrnDetailSchema = exports.GrnDetail = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let GrnDetail = class GrnDetail {
};
exports.GrnDetail = GrnDetail;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GrnDetail.prototype, "grn_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GrnDetail.prototype, "grn_sr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], GrnDetail.prototype, "po_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GrnDetail.prototype, "po_sr", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], GrnDetail.prototype, "grn_rec_qty", void 0);
exports.GrnDetail = GrnDetail = __decorate([
    (0, mongoose_1.Schema)({ collection: 'grn_details', timestamps: true })
], GrnDetail);
exports.GrnDetailSchema = mongoose_1.SchemaFactory.createForClass(GrnDetail);
//# sourceMappingURL=grn-detail.schema.js.map