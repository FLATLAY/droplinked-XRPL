import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Locale } from '../../enums/locale.enum';

export type LocalizationDocument = HydratedDocument<Localization>;

@Schema()
export class Localization {
  @Prop({ type: mongoose.Schema.Types.String })
  uri: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    enum: Locale,
    default: Locale.EN,
  })
  default: Locale;

  @Prop({
    type: [mongoose.Schema.Types.String],
    enum: Locale,
    default: [Locale.EN],
  })
  locales: Locale[];
}

export const LocalizationSchema = SchemaFactory.createForClass(Localization);
