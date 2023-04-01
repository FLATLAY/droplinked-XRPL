import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AttributeDocument, AttributeSchema } from './attribute.model';
import { PropertiesDocument, PropertiesSchema } from './properties.model';
import { LocalizationDocument, LocalizationSchema } from './localization.model';

export type NFTMetadataDocument = HydratedDocument<NFTMetadata>;

@Schema()
export class NFTMetadata {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String, required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.String })
  externalURL: string;

  @Prop({ type: AttributeSchema })
  attributes: AttributeDocument[];

  @Prop({ type: PropertiesSchema })
  properties: PropertiesDocument;

  @Prop({ type: LocalizationSchema })
  localization: LocalizationDocument;
}

export const NFTMetadataSchema = SchemaFactory.createForClass(NFTMetadata);
