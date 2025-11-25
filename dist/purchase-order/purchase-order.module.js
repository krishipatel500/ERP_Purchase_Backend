"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrderModule = void 0;
const common_1 = require("@nestjs/common");
const purchase_order_service_1 = require("./purchase-order.service");
const purchase_order_controller_1 = require("./purchase-order.controller");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_master_schema_1 = require("./schemas/purchase-master.schema");
const purchase_detail_schema_1 = require("./schemas/purchase-detail.schema");
let PurchaseOrderModule = class PurchaseOrderModule {
};
exports.PurchaseOrderModule = PurchaseOrderModule;
exports.PurchaseOrderModule = PurchaseOrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: purchase_master_schema_1.PurchaseMaster.name, schema: purchase_master_schema_1.PurchaseMasterSchema, collection: 'purchase_master_order' },
                { name: purchase_detail_schema_1.PurchaseDetail.name, schema: purchase_detail_schema_1.PurchaseDetailSchema, collection: 'purchase_details_order' },
            ]),
        ],
        controllers: [purchase_order_controller_1.PurchaseOrderController],
        providers: [purchase_order_service_1.PurchaseOrderService],
        exports: [purchase_order_service_1.PurchaseOrderService],
    })
], PurchaseOrderModule);
//# sourceMappingURL=purchase-order.module.js.map