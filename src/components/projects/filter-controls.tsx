'use client';

import { useState } from 'react';
import { mockProjects } from '@/lib/mock-data';
import ProjectCard from './project-card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

type FilterControlsProps = {
  categories: string[];
};

export default function FilterControls({ categories }: FilterControlsProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? mockProjects
    : mockProjects.filter(p => p.category === activeCategory);

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 my-10">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={cn(
                'rounded-full',
                activeCategory === category && 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
