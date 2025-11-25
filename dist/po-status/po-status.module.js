"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoStatusModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_detail_schema_1 = require("../purchase-order/schemas/purchase-detail.schema");
const po_status_service_1 = require("./po-status.service");
const po_status_controller_1 = require("./po-status.controller");
const grn_module_1 = require("../grn/grn.module");
let PoStatusModule = class PoStatusModule {
};
exports.PoStatusModule = PoStatusModule;
exports.PoStatusModule = PoStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: purchase_detail_schema_1.PurchaseDetail.name, schema: purchase_detail_schema_1.PurchaseDetailSchema },
            ]),
            grn_module_1.GrnModule,
        ],
        providers: [po_status_service_1.PoStatusService],
        controllers: [po_status_controller_1.PoStatusController],
    })
], PoStatusModule);
//# sourceMappingURL=po-status.module.js.map