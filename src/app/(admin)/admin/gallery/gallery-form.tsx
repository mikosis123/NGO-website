
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';

const gallerySchema = z.object({
  imageUrl: z.string().url('Please enter a valid image URL.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  imageHint: z.string().min(2, 'Image hint must be at least 2 characters.'),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

interface GalleryFormProps {
    onFinished?: () => void;
}

export function GalleryForm({ onFinished }: GalleryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      imageUrl: '',
      description: '',
      imageHint: '',
    },
  });

  const transformGoogleDriveLink = (url: string): string => {
    const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(googleDriveRegex);

    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    return url;
  };

  async function onSubmit(data: GalleryFormValues) {
    setIsSubmitting(true);
    
    try {
        const transformedUrl = transformGoogleDriveLink(data.imageUrl);

        await addDoc(collection(db, "gallery"), {
            ...data,
            imageUrl: transformedUrl,
            createdAt: new Date(),
        });

        toast({
            title: "Image Added!",
            description: "The image has been successfully added to the gallery.",
        });
        
        form.reset();
        onFinished?.();
    } catch (error) {
        console.error("Error adding image: ", error);
        toast({
            title: "Error",
            description: "There was an error adding the image. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A short description of the image..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'woman smiling'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Image..." : "Add Image"}
        </Button>
      </form>
    </Form>
  );
}
