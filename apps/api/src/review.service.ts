/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async review(
    reviewWhereUniqueInput: Prisma.ReviewWhereUniqueInput,
  ): Promise<Review | null> {
    return this.prisma.review.findUnique({
      where: reviewWhereUniqueInput,
    });
  }

  async reviews(): Promise<Review[]> {
    return this.prisma.review.findMany({});
  }

  async reviewsUnread(orderBy: Prisma.SortOrder): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { isRead: false },
      orderBy: { publishedDate: orderBy },
    });
  }

  async reviewsRead(orderBy: Prisma.SortOrder): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { isRead: true },
      orderBy: { publishedDate: orderBy },
    });
  }

  async createReview(data: Prisma.ReviewCreateInput): Promise<Review> {
    return this.prisma.review.create({ data });
  }

  async updateReview(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
  }): Promise<Review> {
    const { where, data } = params;

    return this.prisma.review.update({
      where,
      data: {
        title: data.title ?? Prisma.skip,
        content: data.content ?? Prisma.skip,
        rating: data.rating ?? Prisma.skip,
        isRead: data.isRead ?? Prisma.skip,
      },
    });
  }

  async deleteReview(where: Prisma.ReviewWhereUniqueInput): Promise<Review> {
    return this.prisma.review.delete({ where });
  }
}
