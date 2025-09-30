
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  longDescription: z.string().min(50, 'Long description must be at least 50 characters.'),
  imageUrl: z.string().url('Please enter a valid image URL.'),
  imageHint: z.string().min(2, 'Image hint must be at least 2 characters.'),
  category: z.enum(['Agriculture', 'Youth', 'Environment', 'Health']),
  goals: z.string().min(1, "Please enter at least one goal."),
  beneficiaries: z.string().min(3, "Beneficiaries must be at least 3 characters."),
  timeline: z.string().min(3, "Timeline must be at least 3 characters.")
});

type ProjectFormValues = z.infer<typeof projectSchema>;

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}


export function ProjectForm() {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      longDescription: '',
      imageUrl: '',
      imageHint: '',
      category: 'Agriculture',
      goals: '',
      beneficiaries: '',
      timeline: '',
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...data,
        goals: data.goals.split(',').map(goal => goal.trim()),
        slug: slugify(data.title),
        createdAt: new Date(),
      });
      toast({
        title: "Project Created!",
        description: `The project "${data.title}" has been successfully created.`,
      });
      console.log("Document written with ID: ", docRef.id);
      form.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast({
        title: "Error",
        description: "There was an error creating the project. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pr-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Community Garden Initiative" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Youth">Youth</SelectItem>
                  <SelectItem value="Environment">Environment</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief summary of the project..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A detailed description of the project..." className="min-h-[150px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="goals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goals (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Goal 1, Goal 2, Goal 3" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beneficiaries"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Beneficiaries</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 500 farming families" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timeline</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2022 - Present" {...field} />
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
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Hint</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 'farmers working'" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Create Project</Button>
      </form>
    </Form>
  );
}
