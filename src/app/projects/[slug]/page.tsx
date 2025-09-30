
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Calendar, Goal, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import BackButton from '@/components/back-button';
import { useEffect, useState } from 'react';
import { Project } from '@/lib/types';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ProjectPage() {
  const params = useParams();
  const { slug } = params;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      try {
        const q = query(collection(db, "projects"), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          setError('Project not found');
        } else {
          const doc = querySnapshot.docs[0];
          const data = doc.data();
          setProject({
            id: doc.id,
            ...data
          } as Project);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError('Failed to load project.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32 text-center">Loading project details...</div>;
  }
  
  if (error) {
     notFound();
  }

  if (!project) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
      <div className="max-w-4xl mx-auto">
        <BackButton />
        <div className="mb-8">
          <Badge variant="secondary" className="mb-2 text-base">{project.category}</Badge>
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{project.title}</h1>
        </div>

        <div className="relative h-[300px] md:h-[500px] w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
            data-ai-hint={project.imageHint}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 prose prose-lg max-w-none">
            <h2 className="font-headline text-3xl">About the Project</h2>
            <p>{project.longDescription}</p>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>
                    <strong>Beneficiaries:</strong> {project.beneficiaries}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    <strong>Timeline:</strong> {project.timeline}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Support This Project</CardTitle>
                </CardHeader>
                 <CardContent>
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-muted-foreground">Funding Progress</span>
                            <span className="text-sm font-bold text-primary">{project.fundingProgress}%</span>
                        </div>
                        <Progress value={project.fundingProgress} className="h-3" />
                    </div>
                    <Button asChild size="lg" className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
                        <Link href="/donate">
                            <Heart className="mr-2 h-5 w-5" />
                            Donate
                        </Link>
                    </Button>
                 </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-12">
            <h2 className="font-headline text-3xl mb-6">Our Goals</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {project.goals.map((goal, index) => (
                    <Card key={index} className="bg-secondary/50">
                        <CardContent className="p-6 flex items-start gap-4">
                            <CheckCircle className="h-6 w-6 text-green-600 mt-1 shrink-0" />
                            <p className="text-foreground">{goal}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
}
