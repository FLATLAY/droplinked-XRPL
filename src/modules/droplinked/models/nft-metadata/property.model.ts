import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PropertyDocument = HydratedDocument<Property>;

@Schema()
export class Property {
  @Prop({ type: mongoose.Schema.Types.Number })
  totalSupply: number;

  @Prop({ type: mongoose.Schema.Types.String })
  checksum: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  price: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
