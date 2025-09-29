
'use client';

import { TeamMember } from '@/lib/types';
import { mockTeam } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import { Goal, Eye, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

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
              <div className="flex justify-center mb-4">
                <div className="bg-primary/10 text-primary p-4 rounded-full">
                  <Goal className="h-8 w-8"/>
                </div>
              </div>
              <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
              <p className="mt-2 text-muted-foreground">To empower vulnerable communities in Ethiopia through sustainable development projects in health, education, and environmental conservation.</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Eye className="h-8 w-8"/>
                  </div>
                </div>
              <h2 className="font-headline text-3xl font-semibold">Our Vision</h2>
              <p className="mt-2 text-muted-foreground">A world where every Ethiopian has the opportunity to achieve their full potential and live with dignity and hope.</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 text-primary p-4 rounded-full">
                    <Shield className="h-8 w-8"/>
                  </div>
                </div>
              <h2 className="font-headline text-3xl font-semibold">Our Values</h2>
              <p className="mt-2 text-muted-foreground">Collaboration, Integrity, Sustainability, and Compassion guide every action we take.</p>
            </div>
        </div>
        
        <div className="mt-20">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-16">Meet Our Team</h2>
            <div className="max-w-4xl mx-auto space-y-16">
            {mockTeam.map((member: TeamMember, i: number) => (
                <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <div className={cn(
                        "grid md:grid-cols-2 gap-8 md:gap-12 items-center",
                    )}>
                        <div className={cn("relative aspect-square rounded-lg overflow-hidden shadow-xl", i % 2 !== 0 && "md:order-last")}>
                            <Image
                                src={member.imageUrl}
                                alt={`Portrait of ${member.name}`}
                                fill
                                className="object-cover"
                                data-ai-hint={member.imageHint}
                            />
                        </div>
                        <div className={cn("text-center", i % 2 === 0 ? "md:text-left" : "md:text-right")}>
                            <h3 className="font-headline text-3xl font-bold">{member.name}</h3>
                            <p className="text-primary text-xl font-medium mt-1">{member.role}</p>
                            <p className="mt-4 text-muted-foreground max-w-md mx-auto md:mx-0">
                                {member.bio || "A dedicated member of our team, working tirelessly to make a positive impact in the communities we serve."}
                            </p>
                        </div>
                    </div>
                </motion.div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
