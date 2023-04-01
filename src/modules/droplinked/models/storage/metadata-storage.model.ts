import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTMetadata } from '../nft-metadata/nft-metadata.model';

export type MetadataStorageDocument = HydratedDocument<MetadataStorage>;

@Schema()
export class MetadataStorage {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  tokenID: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: NFTMetadata.name,
        required: true,
      },
    ],
  })
  metadata: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  metadataHash: string;
}

export const MetadataStorageSchema =
  SchemaFactory.createForClass(MetadataStorage);
