import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('review')
@UseGuards(JwtAuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Body() body: CreateReviewDto, @Req() req) {
    return this.reviewService.create(req.user.userId, body);
  }

  @Get('book/:bookId')
  findByBookId(@Param('bookId') bookId: string) {
    return this.reviewService.findByBookId(bookId);
  }

  @Get('my-reviews')
  async findByUserId(@Req() req) {
    return this.reviewService.findByUserId(req.user.userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto, @Req() req) {
    return this.reviewService.update(req.user.userId, id, updateReviewDto);
  }

  @Delete(':id')
  delete(@Req() req, @Param('id') reviewId: string) {
    return this.reviewService.delete(req.user.userId, reviewId);
  }
}
