import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { UserService } from './user.service';
import { ReviewService } from './review.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, UserService, ReviewService],
})
export class AppModule {}
