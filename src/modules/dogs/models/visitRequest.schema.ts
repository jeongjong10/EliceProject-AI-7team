import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VisitRequestDocument = HydratedDocument<VisitRequest>;
enum State {
    Submitted,
    InReview,
    Transferred,
}

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class VisitRequest {
    @Prop()
    dog_id: String;

    @Prop()
    name: String;

    @Prop()
    phone: String;

    @Prop()
    when_day: Date;

    @Prop()
    when_time: String;

    @Prop({ default: State.Submitted })
    state: State;

    @Prop({ default: true })
    isActive: boolean;
}

export const VisitRequestSchema = SchemaFactory.createForClass(VisitRequest);
