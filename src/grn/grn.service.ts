import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GrnMaster, GrnMasterDocument } from './schemas/grn-master.schema';
import { GrnDetail, GrnDetailDocument } from './schemas/grn-detail.schema';
import { Model } from 'mongoose';
import { CreateGrnDto } from './dto/create-grn.dto';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';

@Injectable()
export class GrnService {
  constructor(
    @InjectModel(GrnMaster.name) private grnMasterModel: Model<GrnMasterDocument>,
    @InjectModel(GrnDetail.name) private grnDetailModel: Model<GrnDetailDocument>,
    private readonly poService: PurchaseOrderService,
  ) {}

  // Create GRN: insert master + details, then update purchase details po_rec_qty
  async create(createDto: CreateGrnDto) {
    const { grn_id, grn_date, grn_no, sup_id, po_id, details } = createDto;

    if (!details || details.length === 0) throw new BadRequestException('GRN details required');

    const existing = await this.grnMasterModel.findOne({ grn_id });
    if (existing) throw new BadRequestException('grn_id already exists');

    const master = new this.grnMasterModel({
      grn_id,
      grn_date: new Date(grn_date),
      grn_no,
      sup_id,
      po_id,
    });
    await master.save();

    // Save GRN details & update PO rec_qty
    const toInsert = details.map((d) => ({
      grn_id,
      grn_sr: d.grn_sr,
      po_id,
      po_sr: d.po_sr,
      grn_rec_qty: d.grn_rec_qty,
    }));

    await this.grnDetailModel.insertMany(toInsert);

    // For each detail, update the corresponding PO detail's po_rec_qty
    for (const d of details) {
      // increment rec qty by grn_rec_qty
      await this.poService.incrementRecQty(po_id, d.po_sr, d.grn_rec_qty);
    }

    return { ok: true, grn_id };
  }
}
