'use client';

import Link from 'next/link';
import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { navLinks } from '@/lib/mock-data';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useState } from 'react';

const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: SubscriptionFormValues) {
    setIsSubmitting(true);
    try {
      // Check if the email is already subscribed
      const subscriptionsRef = collection(db, 'subscriptions');
      const q = query(subscriptionsRef, where('email', '==', data.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast({
          title: 'Already Subscribed',
          description: 'This email address is already on our mailing list.',
          variant: 'default',
        });
        return;
      }

      // Add the new subscription
      await addDoc(subscriptionsRef, {
        email: data.email,
        createdAt: new Date(),
        read: false,
      });

      toast({
        title: 'Subscription Successful!',
        description: `Thank you for subscribing! We've added ${data.email} to our mailing list.`,
      });
      form.reset();
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: 'Subscription Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Empowering communities in Ethiopia and creating sustainable change for a better future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Get Involved</h3>
            <ul className="space-y-2">
              <li><Link href="/donate" className="text-sm text-muted-foreground hover:text-primary">Donate</Link></li>
              <li><Link href="/contact#volunteer" className="text-sm text-muted-foreground hover:text-primary">Volunteer</Link></li>
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">Our Work</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-2">Subscribe to our newsletter for the latest news and updates from Ethiopia.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input type="email" placeholder="Your email" className="bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Light for Generation Ethiopia. All rights reserved.</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link> | <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
