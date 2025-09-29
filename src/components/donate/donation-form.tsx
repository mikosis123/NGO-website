'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart } from 'lucide-react';

const donationSchema = z.object({
  amount: z.string().min(1, 'Please select or enter an amount.'),
  customAmount: z.string().optional(),
  fund: z.string().min(1, 'Please select a fund.'),
  name: z.string().min(2, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const presetAmounts = ['25', '50', '100', '250'];

export default function DonationForm() {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: '50',
      customAmount: '',
      fund: 'general',
      name: '',
      email: '',
    },
  });

  function onSubmit(data: DonationFormValues) {
    const finalAmount = data.amount === 'custom' ? data.customAmount : data.amount;
    toast({
      title: "Donation Submitted!",
      description: `Thank you, ${data.name}! Your donation of $${finalAmount} to the ${data.fund} fund is being processed.`,
    });
    form.reset();
  }

  const selectedAmount = form.watch('amount');

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Make a Donation</CardTitle>
        <CardDescription>Your support helps us continue our work.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base">Select Amount (USD)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-2 gap-4"
                    >
                      {presetAmounts.map((amount) => (
                        <FormItem key={amount} className="flex-1">
                          <FormControl>
                            <RadioGroupItem value={amount} className="sr-only" />
                          </FormControl>
                          <FormLabel className="flex items-center justify-center p-4 rounded-md border-2 border-muted bg-popover hover:bg-accent/50 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 transition-all cursor-pointer text-lg font-semibold">
                            ${amount}
                          </FormLabel>
                        </FormItem>
                      ))}
                      <FormItem className="flex-1">
                          <FormControl>
                            <RadioGroupItem value="custom" className="sr-only" />
                          </FormControl>
                          <FormLabel className="flex items-center justify-center p-4 rounded-md border-2 border-muted bg-popover hover:bg-accent/50 hover:text-accent-foreground [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/10 transition-all cursor-pointer text-lg font-semibold">
                            Custom
                          </FormLabel>
                        </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedAmount === 'custom' && (
              <FormField
                control={form.control}
                name="customAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter amount" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="fund"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donate To</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a fund" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Fund</SelectItem>
                      <SelectItem value="agriculture">Sustainable Farming Initiative</SelectItem>
                      <SelectItem value="youth">Youth Coding Bootcamp</SelectItem>
                      <SelectItem value="health">Community Health Clinics</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-lg py-6 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
