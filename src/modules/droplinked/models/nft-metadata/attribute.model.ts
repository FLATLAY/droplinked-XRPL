import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AttributeDocument = HydratedDocument<Attribute>;

@Schema()
export class Attribute {
  @Prop({ type: mongoose.Schema.Types.String })
  name: string;

  @Prop({ type: mongoose.Schema.Types.String })
  description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  value: string;
}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);
