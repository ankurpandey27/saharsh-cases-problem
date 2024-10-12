import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'cases', timestamps: true })
export class Cases extends Document {
  @Prop({ required: true })
  caseId: string;

  @Prop({ required: true })
  bankName: string;

  @Prop({ required: true })
  propertyName: string;

  @Prop({ required: true })
  propertyType: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  borrowerName: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ required: true, default: Date.now() })
  updatedAt: Date;
}

export type CasesDocument = Cases & Document;
export const CasesSchema = SchemaFactory.createForClass(Cases);
