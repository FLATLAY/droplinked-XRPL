import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { MetadataStorage } from './metadata-storage.model';
import { HolderStorage } from './holder-storage.model';

export type StorageDocument = HydratedDocument<Storage>;

@Schema()
export class Storage {
  @Prop({ type: mongoose.Schema.Types.Number, required: true, default: 0 })
  nftsCount: number;

  @Prop({ type: mongoose.Schema.Types.Number, requierd: true, default: 0 })
  productsCount: number;

  @Prop({ type: mongoose.Schema.Types.Number, required: true, default: 0 })
  holdersCount: number;

  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: MetadataStorage.name }],
  })
  productsMetadata: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: HolderStorage.name }] })
  productsHolders: mongoose.Schema.Types.ObjectId[];
}

export const StorageSchema = SchemaFactory.createForClass(Storage);
