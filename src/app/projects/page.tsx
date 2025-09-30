
import FilterControls from '@/components/projects/filter-controls';
import { mockProjects, mockResources } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Download } from 'lucide-react';

export default function ProjectsPage() {
  const categories = ['All', ...Array.from(new Set(mockProjects.map(p => p.category)))];

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Our Projects</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            From sustainable agriculture to youth education, our projects are designed to create lasting impact. Explore our work and see how we're making a difference.
          </p>
        </div>

        <FilterControls categories={categories} />
      </div>
    </>
  );
}

    