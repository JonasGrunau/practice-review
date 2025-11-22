import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, Review, User } from '@prisma/client';
import { ReviewService } from './review.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.user({ id: Number(id) });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  @Get('reviews')
  async getReviews() {
    return await this.reviewService.reviews();
  }

  @Get('reviews/unread')
  async getReviewsUnread(@Query('orderBy') orderBy: Prisma.SortOrder) {
    return await this.reviewService.reviewsUnread(orderBy);
  }

  @Get('reviews/read')
  async getReviewsRead(@Query('orderBy') orderBy: Prisma.SortOrder) {
    return await this.reviewService.reviewsRead(orderBy);
  }

  @Post('review')
  async createReview(@Body() postData: Partial<Review>) {
    if (!postData.title || !postData.content || !postData.rating) {
      throw new BadRequestException(`Invalid review data`);
    }

    return await this.reviewService.createReview({
      title: postData.title,
      content: postData.content,
      rating: postData.rating,
      isRead: false,
      publishedDate: new Date(),
    });
  }

  @Put('review/:id')
  async updateReview(
    @Param('id') id: number,
    @Body() putData: Partial<Review>,
  ) {
    return await this.reviewService.updateReview({
      where: { id: Number(id) },
      data: putData,
    });
  }

  @Delete('review/:id')
  async deleteReview(@Param('id') id: number) {
    return await this.reviewService.deleteReview({ id: Number(id) });
  }
}
