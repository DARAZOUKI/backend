import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true }) // Auto-adds createdAt field
export class Review {
  @Prop({ required: true })
  bookId: string; // ID from Google Books API

  @Prop({ required: true  })
  userId: string; // ID of the user who wrote the review


  @Prop({ required: true })
  reviewText: string; // Review content

  @Prop({ required: true, min: 1, max: 5 })
  rating: number; // Rating from 1 to 5
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
