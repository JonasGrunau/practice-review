import { ArrowUpLeft, Check, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Review } from '@prisma/client';

export default function ReviewCard({
  review,
  onMarkAsReadClick,
}: {
  review: Review;
  onMarkAsReadClick: (review: Review) => void;
}) {
  return (
    <Card className="flex">
      <CardHeader className="flex flex-col gap-1 items-stretch">
        <div className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{review.title}</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="font-bold">{review.rating}/5</span>
            <Star className="fill-amber-400" strokeWidth={0} />
          </div>
        </div>
        <CardDescription>
          Abgegeben am {new Date(review.publishedDate).toLocaleDateString()}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p>{review.content}</p>
      </CardContent>

      <CardFooter className="justify-end">
        <Button variant="outline" onClick={() => onMarkAsReadClick(review)}>
          {review.isRead ? (
            <>
              <ArrowUpLeft /> Als ungelesen markieren
            </>
          ) : (
            <>
              <Check /> Als gelesen markieren
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
