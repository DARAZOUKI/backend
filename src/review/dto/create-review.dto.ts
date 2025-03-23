import { IsString, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  bookId: string;


  @IsString()
  @IsNotEmpty()
  reviewText: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
