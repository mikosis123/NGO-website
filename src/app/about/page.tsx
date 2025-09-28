import { TeamMember } from '@/lib/types';
import { mockTeam } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">About Empower Change</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          We are a dedicated team of professionals, volunteers, and partners committed to creating lasting, positive change in communities around the world.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Mission</h2>
          <p className="mt-2 text-muted-foreground">To empower vulnerable communities through sustainable development projects in health, education, and environmental conservation.</p>
        </div>
        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Vision</h2>
          <p className="mt-2 text-muted-foreground">A world where every individual has the opportunity to achieve their full potential and live with dignity and hope.</p>
        </div>
        <div>
          <h2 className="font-headline text-3xl font-semibold">Our Values</h2>
          <p className="mt-2 text-muted-foreground">Collaboration, Integrity, Sustainability, and Compassion guide every action we take.</p>
        </div>
      </div>
      
      <div className="mt-20">
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockTeam.map((member: TeamMember) => (
            <Card key={member.id} className="text-center overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
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
          ))}
        </div>
      </div>
    </div>
  );
}
