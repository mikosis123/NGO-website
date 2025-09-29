
'use client';

import { TeamMember } from '@/lib/types';
import { mockTeam } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const aboutHeroImage = PlaceHolderImages.find(p => p.id === 'about-hero');

  return (
    <div>
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-center justify-center">
        {aboutHeroImage && (
          <Image
            src={aboutHeroImage.imageUrl}
            alt={aboutHeroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={aboutHeroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-white">About Light for Generation Ethiopia</h1>
            <p className="mt-4 text-lg md:text-xl text-slate-200">
            We are a dedicated team of professionals, volunteers, and partners committed to creating lasting, positive change in communities throughout Ethiopia.
            </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
            <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
            <p className="mt-2 text-muted-foreground">To empower vulnerable communities in Ethiopia through sustainable development projects in health, education, and environmental conservation.</p>
            </div>
            <div>
            <h2 className="font-headline text-3xl font-semibold">Our Vision</h2>
            <p className="mt-2 text-muted-foreground">A world where every Ethiopian has the opportunity to achieve their full potential and live with dignity and hope.</p>
            </div>
            <div>
            <h2 className="font-headline text-3xl font-semibold">Our Values</h2>
            <p className="mt-2 text-muted-foreground">Collaboration, Integrity, Sustainability, and Compassion guide every action we take.</p>
            </div>
        </div>
        
        <div className="mt-20">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {mockTeam.map((member: TeamMember, i: number) => (
                <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    className="h-full"
                >
                    <Card className="text-center overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-full">
                    <CardHeader className="p-0">
                        <Image
                        src={member.imageUrl}
                        alt={`Portrait of ${member.name}`}
                        width={400}
                        height={400}
                        className="w-full h-auto aspect-square object-cover"
                        data-ai-hint={member.imageHint}
                        />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl font-headline">{member.name}</CardTitle>
                        <p className="text-primary font-medium">{member.role}</p>
                    </CardContent>
                    </Card>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
