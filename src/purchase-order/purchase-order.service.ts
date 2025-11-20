import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { RevisionPurchaseOrderDto } from './dto/revision-purchase-order.dto';
import { PurchaseMaster, PurchaseMasterDocument } from './schemas/purchase-master.schema';
import { PurchaseDetail, PurchaseDetailDocument } from './schemas/purchase-detail.schema';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectModel(PurchaseMaster.name) private masterModel: Model<PurchaseMasterDocument>,
    @InjectModel(PurchaseDetail.name) private detailModel: Model<PurchaseDetailDocument>,
  ) {}

  /*************************************************************
   * CREATE PURCHASE ORDER
   *************************************************************/
  async create(createDto: CreatePurchaseOrderDto) {
    const { po_id, po_date, po_no, sup_id, details } = createDto;

    if (!details || details.length === 0) {
      throw new BadRequestException('details are required');
    }

    // calculate totals
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
        po_pending_qty: d.po_qty, // full pending initially
        po_rate: d.po_rate,
        po_sub_total: sub,
      };
    });

    // check existing
    const exists = await this.masterModel.findOne({ po_id });
    if (exists) throw new BadRequestException('po_id already exists');

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

  /*************************************************************
   * REVISION (ERP LOGIC)
   *************************************************************/
  async revise(revDto: RevisionPurchaseOrderDto) {
    const { po_id, po_date, po_no, po_rev_reason, sup_id, details } = revDto;

    // ===== 1) FETCH OLD MASTER =====
    const oldMaster = await this.masterModel.findOne({ po_id });
    if (!oldMaster) throw new NotFoundException('PO not found');

    // ===== 2) FETCH OLD DETAILS =====
    const oldDetails = await this.detailModel.find({ po_id }).lean();

    // ===== 3) CLOSE OLD MASTER =====
    oldMaster.po_is_active = false;
    await oldMaster.save();

    // ===== 4) UPDATE OLD DETAILS (AJD & PENDING = 0) =====
    for (const row of oldDetails) {
      const adj = row.po_qty - row.po_rec_qty;

      await this.detailModel.findByIdAndUpdate(row._id, {
        $set: {
          po_adj_qty: adj,
          po_pending_qty: 0,
        },
      });
    }

    // ===== 5) CREATE NEW REVISION PO ID =====
    const newRevNo = (oldMaster.po_rev || 0) + 1;
    const newPoId = `${po_id}-R${newRevNo}`;

    // ===== 6) CREATE NEW MASTER ENTRY =====
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

    // ===== 7) NEW DETAILS (with GRN CARRY FORWARD) =====
   let totalAmount = 0;
const newDetailRows: any[] = [];   // FIX ADDED HERE

for (const item of details) {
  const oldRow = oldDetails.find((d) => d.po_sr === item.po_sr);
  const carriedRecQty = oldRow ? oldRow.po_rec_qty : 0;

  const sub = Number((item.po_qty * item.po_rate).toFixed(2));
  totalAmount += sub;

  newDetailRows.push({
    po_id: newPoId,
    po_sr: item.po_sr,
    pro_id: item.pro_id,
    po_qty: item.po_qty,
    po_rate: item.po_rate,
    po_sub_total: sub,
    po_rec_qty: carriedRecQty,
    po_adj_qty: 0,
    po_pending_qty: item.po_qty - carriedRecQty,
  });
}

await this.detailModel.insertMany(newDetailRows);

    // ===== 9) UPDATE NEW MASTER TOTAL =====
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

  /*************************************************************
   * USED BY GRN MODULE
   *************************************************************/
async incrementRecQty(po_id: string, po_sr: number, qty: number) {
  // First increment po_rec_qty
  const updated = await this.detailModel.findOneAndUpdate(
    { po_id, po_sr },
    { $inc: { po_rec_qty: qty } },
    { new: true },
  );

  if (!updated) {
    throw new NotFoundException(`PO detail not found for ${po_id} SR ${po_sr}`);
  }

  // Now recalc pending (Mongoose cannot do this in same query)
  const pending = updated.po_qty - updated.po_rec_qty;

  updated.po_pending_qty = pending;
  await updated.save();

  return updated;
}

  async getDetailsByPoId(po_id: string) {
    return this.detailModel.find({ po_id }).sort({ po_sr: 1 }).lean();
  }
}
