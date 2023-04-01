import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertiesDocument = HydratedDocument<Properties>;

@Schema()
export class Properties {
  @Prop({ type: mongoose.Schema.Types.Number })
  totalSupply: number;

  @Prop({ type: mongoose.Schema.Types.String })
  checksum: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  price: number;
}

export const PropertiesSchema = SchemaFactory.createForClass(Properties);
