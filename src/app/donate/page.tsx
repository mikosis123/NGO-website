import DonationForm from '@/components/donate/donation-form';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function DonatePage() {
    const testimonialImage = PlaceHolderImages.find(p => p.id === 'donor-testimonial');

  return (
    <div className="bg-secondary/50">
        <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
                <h1 className="font-headline text-4xl md:text-5xl !leading-tight">Your Donation Empowers Change</h1>
                <p>
                Every contribution, no matter the size, makes a significant impact. Your generosity funds our vital projects, providing resources, education, and hope to communities in need. Join us in building a better world, one donation at a time.
                </p>
                
                <Card className="mt-8 bg-background/70 shadow-none">
                    <CardContent className="p-6">
                        <blockquote className="text-lg italic border-l-4 border-primary pl-4 m-0">
                            "I donate to Empower Change because I see the direct impact my contribution has. The transparency and dedication of their team are truly inspiring."
                        </blockquote>
                        <div className="flex items-center mt-4">
                        {testimonialImage && (
                            <Avatar>
                                <AvatarImage src={testimonialImage.imageUrl} alt="Donor" data-ai-hint={testimonialImage.imageHint} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        )}
                        <p className="ml-4 font-semibold text-foreground/80">- Jane Doe, Long-time Supporter</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div>
                <DonationForm />
            </div>
        </div>
        </div>
    </div>
  );
}
