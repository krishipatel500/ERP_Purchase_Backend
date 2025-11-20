import { Module } from '@nestjs/common';
import { PoStatusService } from './po-status.service';
import { PoStatusController } from './po-status.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PurchaseDetail, PurchaseDetailSchema } from '../purchase-order/schemas/purchase-detail.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PurchaseDetail.name, schema: PurchaseDetailSchema }])],
  controllers: [PoStatusController],
  providers: [PoStatusService],
})
export class PoStatusModule {}
