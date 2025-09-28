import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AiHighlights from '@/components/homepage/ai-highlights';
import ImpactCounters from '@/components/homepage/impact-counters';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { mockProjects } from '@/lib/mock-data';
import ProjectCard from '@/components/projects/project-card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-community');
  const featuredProjects = mockProjects.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[500px] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl font-bold !leading-tight">
            Empowering Communities,
            <br />
            Changing Lives
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-slate-200">
            Join us in our mission to create sustainable change through community-driven projects in health, education, and environmental protection.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/donate">Donate Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/about">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      <ImpactCounters />

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-headline text-3xl md:text-4xl">Featured Projects</h2>
              <p>
                Discover our latest initiatives and see how we're making a difference on the ground. Each project is a step towards a brighter, more equitable future.
              </p>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/projects">View All Projects <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {featuredProjects.slice(0, 2).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-secondary/50 border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-3xl md:text-4xl">AI-Powered Story Highlights</CardTitle>
              <CardDescription className="max-w-2xl mx-auto text-base">
                Using AI, we analyze our latest data to bring you the most compelling stories of impact. Generate a new set of highlights to see what's new.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AiHighlights />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Ready to Make a Difference?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your support is crucial to our work. Whether you donate, volunteer, or spread the word, you are a part of the change.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/donate">Support Our Cause</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/news">Read Our News</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
