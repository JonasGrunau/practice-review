'use client';

import { API_URL } from '../constants';
import { Review } from '@prisma/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/loading-spinner';
import ReviewCard from '@/components/review-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Dashboard() {
  const [unreadReadFilter, setUnreadReadFilter] = useState('unread');
  const [orderByFilter, setOrderByFilter] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const result = await fetch(
          `${API_URL}/reviews/${unreadReadFilter}?orderBy=${orderByFilter}`
        );

        if (!result.ok) {
          throw new Error('Network response was not ok');
        }

        const reviewsResult: Review[] = await result.json();
        setReviews(reviewsResult);
      } catch (error: unknown) {
        toast('Etwas ist schief gelaufen!', {
          description: 'Bitte versuche es später erneut.',
        });

        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [unreadReadFilter, orderByFilter]);

  function handleOrderByFilterChange(value: string) {
    setOrderByFilter(value);
  }

  function handleUnreadReadFilterChange(value: string) {
    setUnreadReadFilter(value);
  }

  async function handleMarkAsUnreadReadClick(review: Review) {
    const result = await fetch(`${API_URL}/review/${review.id}/mark-as-read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead: !review.isRead }),
    });

    if (result.ok) {
      setReviews(reviews?.filter((item) => item.id !== review.id));

      toast('Aktion erfolgreich!', {
        description: `Das Review wurde als ${review.isRead ? 'ungelesen' : 'gelesen'} markiert.`,
      });
    } else {
      toast('Etwas ist schief gelaufen!', {
        description: 'Bitte versuche es später erneut.',
      });
    }
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 px-8 overflow-scroll h-screen flex flex-col items-center">
      <div className="flex flex-col items-center w-full">
        <div className="flex justify-end gap-4 max-w-[650px] w-full">
          <Select
            value={orderByFilter}
            onValueChange={handleOrderByFilterChange}>
            <SelectTrigger className="w-[180px] mb-8 self-end">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Älteste zuerst</SelectItem>
              <SelectItem value="desc">Neueste zuerst</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={unreadReadFilter}
            onValueChange={handleUnreadReadFilterChange}>
            <SelectTrigger className="w-[180px] mb-8 self-end">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="unread">Ungelesen</SelectItem>
              <SelectItem value="read">Gelesen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="flex items-center flex-col gap-8 w-full max-w-[650px]">
          {reviews && reviews.length === 0 && (
            <div className="flex justify-center w-[650px] p-16">
              <span className="text-muted-foreground">
                Kein Feedback gefunden...
              </span>
            </div>
          )}
          {reviews &&
            reviews.map((review: Review) => (
              <li className="w-full" key={review.id}>
                <ReviewCard
                  review={review}
                  onMarkAsReadClick={handleMarkAsUnreadReadClick}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
