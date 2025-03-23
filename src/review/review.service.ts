import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<ReviewDocument>) {}

  async create(userId: string, createReviewDto: CreateReviewDto) {
    const { bookId, reviewText, rating } = createReviewDto;
    console.log("Creating review for user:", userId);
    console.log("Review Data:", createReviewDto);
  
    const review = new this.reviewModel({ bookId, userId, reviewText, rating });
    const savedReview = await review.save();
    console.log("Saved Review:", savedReview);
    return savedReview;
  }
  

  async findByBookId(bookId: string) {
    return this.reviewModel.find({ bookId }).populate('userId', 'username').sort({ createdAt: -1 }).exec();
  }
  
  

  async findByUserId(userId: string) {
    return this.reviewModel.find({ userId }).select('-userId').exec();
  }

  async update(userId: string, reviewId: string, updateReviewDto: UpdateReviewDto) {
    const review = await this.reviewModel.findById(reviewId);
    if (!review) throw new NotFoundException('Review not found');

    if (String(review.userId) !== String(userId)) {
      throw new UnauthorizedException('You can only edit your own reviews');
    }

    Object.assign(review, updateReviewDto);
    return review.save();
  }

  async delete(userId: string, reviewId: string) {
    const review = await this.reviewModel.findById(reviewId);
    if (!review) throw new NotFoundException('Review not found');

    if (String(review.userId) !== String(userId)) {
      throw new UnauthorizedException('You can only delete your own reviews');
    }

    return this.reviewModel.deleteOne({ _id: reviewId }).exec();
  }
}
