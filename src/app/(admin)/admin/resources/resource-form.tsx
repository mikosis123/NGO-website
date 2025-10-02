
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
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Resource } from '@/lib/types';

const resourceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  fileUrl: z.string().url('Please enter a valid URL.'),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

interface ResourceFormProps {
    resourceToEdit?: Omit<Resource, 'icon'> | null;
    onFinished?: () => void;
}

export function ResourceForm({ resourceToEdit, onFinished }: ResourceFormProps) {
  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: resourceToEdit || {
      title: '',
      description: '',
      fileUrl: '',
    },
  });

  useEffect(() => {
    if (resourceToEdit) {
      form.reset(resourceToEdit);
    } else {
      form.reset({
        title: '',
        description: '',
        fileUrl: '',
      });
    }
  }, [resourceToEdit, form]);
  
  const transformGoogleDriveLink = (url: string): string => {
    const googleDriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(googleDriveRegex);

    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    return url;
  };

  async function onSubmit(data: ResourceFormValues) {
    try {
      const transformedUrl = transformGoogleDriveLink(data.fileUrl);
      const submissionData = {
          ...data,
          fileUrl: transformedUrl,
      }

      if (resourceToEdit) {
        const docRef = doc(db, "resources", resourceToEdit.id);
        await updateDoc(docRef, submissionData);
        toast({
            title: "Resource Updated!",
            description: `The resource "${data.title}" has been successfully updated.`,
        });
      } else {
        const docRef = await addDoc(collection(db, "resources"), {
          ...submissionData,
          createdAt: new Date(),
        });
        toast({
            title: "Resource Created!",
            description: `The resource "${data.title}" has been successfully created.`,
        });
        console.log("Document written with ID: ", docRef.id);
      }
      
      form.reset();
      onFinished?.();
    } catch (error) {
       console.error("Error saving document: ", error);
       toast({
        title: "Error",
        description: "There was an error saving the resource. Please try again.",
        variant: "destructive",
      });
    }
  }

  const buttonText = resourceToEdit ? "Update Resource" : "Create Resource";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resource Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2023 Annual Report" {...field} />
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
                <Textarea placeholder="A short description of the resource..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File URL (Google Drive link)</FormLabel>
              <FormControl>
                <Input placeholder="https://drive.google.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">{buttonText}</Button>
      </form>
    </Form>
  );
}
