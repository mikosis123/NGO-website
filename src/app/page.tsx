
'use client'

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Autoplay from "embla-carousel-autoplay"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import ImpactCounters from '@/components/homepage/impact-counters';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProjectCard from '@/components/projects/project-card';
import { ArrowRight, Quote, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ArticleCard from '@/components/news/article-card';
import React, { useEffect, useState } from 'react';
import { Project, NewsArticle } from '@/lib/types';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const testimonials = [
    {
        quote: "The new well in our village has changed everything. Our children are healthier, and we spend less time fetching water and more time on our farms.",
        name: "Abebe Tadesse",
        location: "Rural Village, Ethiopia",
        image: "https://picsum.photos/seed/person1/100/100",
        imageHint: "woman portrait"
    },
    {
        quote: "I am the first person in my family to finish high school. The scholarship from Light for Generation Ethiopia made my dream possible.",
        name: "Fatuma Kedir",
        location: "Addis Ababa, Ethiopia",
        image: "https://picsum.photos/seed/person2/100/100",
        imageHint: "man portrait"
    },
    {
        quote: "Volunteering for the reforestation project was a life-changing experience. Seeing the forest grow, knowing you were a part of it, is incredible.",
        name: "Maria Rodriguez",
        location: "Oromia Region, Ethiopia",
        image: "https://picsum.photos/seed/person3/100/100",
        imageHint: "person smiling"
    },
    {
        quote: "The vocational training gave me the skills to start my own business. I can now provide for my family with dignity.",
        name: "Samuel Chen",
        location: "Dire Dawa, Ethiopia",
        image: "https://picsum.photos/seed/person4/100/100",
        imageHint: "man smiling"
    }
]

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-community');
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  useEffect(() => {
    const fetchData = async () => {
        try {
            const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(2));
            const projectsSnapshot = await getDocs(projectsQuery);
            const projectsData: Project[] = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
            setFeaturedProjects(projectsData);

            const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(2));
            const newsSnapshot = await getDocs(newsQuery);
            const newsData: NewsArticle[] = newsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsArticle));
            setLatestNews(newsData);

        } catch (error) {
            console.error("Error fetching homepage data:", error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="flex flex-col">
       <section className="relative h-screen w-full">
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
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline text-4xl md:text-6xl font-bold !leading-tight"
          >
            Light for Generation Ethiopia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-2xl text-lg md:text-xl text-slate-200"
          >
            Join us in our mission to create sustainable change in Ethiopia through community-driven projects in health, education, and environmental protection.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Donate Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/about">Get Involved</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <ImpactCounters />

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 md:py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="prose prose-lg max-w-none">
              <h2 className="font-headline text-3xl md:text-4xl">Featured Projects</h2>
              <p>
                Discover our latest initiatives in Ethiopia and see how we're making a difference on the ground. Each project is a step towards a brighter, more equitable future.
              </p>
              <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/projects">View All Projects <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {featuredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  custom={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.2 } }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md-py-20 bg-blue-100"
      >
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Stories from the Field</h2>
            </div>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-4xl mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    align: "start",
                    loop: true,
                }}
            >
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                                <Card className="flex flex-col h-full bg-background text-foreground">
                                    <CardContent className="p-6 flex-grow flex flex-col">
                                        <Quote className="w-8 h-8 text-primary mb-4" />
                                        <p className="italic text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                                    </CardContent>
                                    <CardFooter className="p-6 bg-secondary/30 flex items-center">
                                        <Avatar>
                                            <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.imageHint} />
                                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="ml-4">
                                            <p className="font-bold">{testimonial.name}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="border-accent bg-white text-accent hover:bg-accent hover:text-accent-foreground hidden md:flex" />
                <CarouselNext className="border-accent bg-white text-accent hover:bg-accent hover:text-accent-foreground hidden md:flex" />
            </Carousel>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 md:py-20 bg-background"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Latest News</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Stay up-to-date with our latest activities and stories of change from Ethiopia.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-12">
            {latestNews.map((article, i) => (
                <motion.div
                    key={article.id}
                    custom={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.3 } }}
                    viewport={{ once: true }}
                >
                    <ArticleCard article={article} />
                </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/news">View All News <ArrowRight className="ml-2" /></Link>
            </Button>
          </div>
        </div>
      </motion.section>


      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="py-12 md:py-20 bg-blue-100"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl">Ready to Make a Difference?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your support is crucial to our work in Ethiopia. Whether you donate, volunteer, or spread the word, you are a part of the change.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
              <Link href="/donate">
                <Heart className="mr-2 h-5 w-5" />
                Support Our Cause
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get Involved</Link>
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
