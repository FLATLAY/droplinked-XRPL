import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type HolderStorageDocument = HydratedDocument<HolderStorage>;

@Schema()
export class HolderStorage {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  xrplClassicAddress: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  tokenID: string;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  totalSupply: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true })
  remainingSupply: number;
}

export const HolderStorageSchema = SchemaFactory.createForClass(HolderStorage);
