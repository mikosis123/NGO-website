
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

const newsSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  imageUrl: z.string().url('Please enter a valid image URL.'),
  imageHint: z.string().min(2, 'Image hint must be at least 2 characters.'),
});

type NewsFormValues = z.infer<typeof newsSchema>;

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function NewsForm() {
  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      imageHint: '',
    },
  });

  async function onSubmit(data: NewsFormValues) {
    try {
      const submissionData = {
          ...data,
          slug: slugify(data.title),
          date: new Date().toISOString(),
          createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, "news"), submissionData);
      
      toast({
        title: "Article Created!",
        description: `The article "${data.title}" has been successfully created.`,
      });
      console.log("Document written with ID: ", docRef.id);
      form.reset();
    } catch (error) {
       console.error("Error adding document: ", error);
       toast({
        title: "Error",
        description: "There was an error creating the article. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Article Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New Well Brings Clean Water" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the article..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Content</FormLabel>
              <FormControl>
                <Textarea placeholder="The full content of the news article..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
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
                <Input placeholder="e.g., 'children drinking water'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Create Article</Button>
      </form>
    </Form>
  );
}
