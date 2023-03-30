import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    transform: (_doc: UserDocument, ret: UserDocument) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class User {
  @Prop({ type: mongoose.Schema.Types.String })
  xrplAccountSeed: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
