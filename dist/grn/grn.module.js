"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrnModule = void 0;
const common_1 = require("@nestjs/common");
const grn_service_1 = require("./grn.service");
const grn_controller_1 = require("./grn.controller");
const mongoose_1 = require("@nestjs/mongoose");
const grn_master_schema_1 = require("./schemas/grn-master.schema");
const grn_detail_schema_1 = require("./schemas/grn-detail.schema");
const purchase_order_module_1 = require("../purchase-order/purchase-order.module");
let GrnModule = class GrnModule {
};
exports.GrnModule = GrnModule;
exports.GrnModule = GrnModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: grn_master_schema_1.GrnMaster.name, schema: grn_master_schema_1.GrnMasterSchema, collection: 'grn_master' },
                { name: grn_detail_schema_1.GrnDetail.name, schema: grn_detail_schema_1.GrnDetailSchema, collection: 'grn_details' },
            ]),
            purchase_order_module_1.PurchaseOrderModule,
        ],
        controllers: [grn_controller_1.GrnController],
        providers: [grn_service_1.GrnService],
    })
], GrnModule);
//# sourceMappingURL=grn.module.js.map