import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.schema';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ConfigModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
