'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import StarRating from '@/components/star-rating';
import { API_URL } from './constants';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';

const formSchema = z.object({
  title: z
    .string()
    .min(5, 'Der Titel muss mindestens 5 Zeichen lang sein.')
    .max(32, 'Der Titel darf höchstens 32 Zeichen lang sein.'),
  content: z
    .string()
    .min(20, 'Die Beschreibung muss mindestens 20 Zeichen lang sein.')
    .max(300, 'Die Beschreibung darf höchstens 300 Zeichen lang sein.'),
});

export default function Home() {
  const [rating, setRating] = React.useState(1);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    const result = await fetch(`${API_URL}/review/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        rating,
      }),
    });

    if (result.ok) {
      form.reset();
      setRating(1);

      toast('Aktion erfolgreich!', {
        description: `Dein Feedback wurde erfolgreich abgesendet.`,
      });
    } else {
      toast('Etwas ist schief gelaufen!', {
        description: 'Bitte versuche es später erneut.',
      });
    }
  }

  return (
    <div className="flex justify-center p-8">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Feedback</CardTitle>
          <CardDescription>
            Hilf uns dabei uns zu verbessern, indem du hier dein Feedback
            abgibst.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="feedback-form" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel>Bewertung</FieldLabel>
                <StarRating
                  value={rating}
                  onChange={(value) => setRating(value)}
                />
              </Field>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="title">Titel</FieldLabel>
                    <Input
                      {...field}
                      id="title"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="content">Dein Feedback</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        id="content"
                        rows={6}
                        className="min-h-24 resize-none"
                        aria-invalid={fieldState.invalid}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="tabular-nums">
                          {field.value.length}/300 Zeichen
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field className="flex justify-end" orientation="horizontal">
            <Button type="submit" form="feedback-form">
              <Check /> Absenden
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
