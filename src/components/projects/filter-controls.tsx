'use client';

import { useState } from 'react';
import { mockProjects } from '@/lib/mock-data';
import ProjectCard from './project-card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type FilterControlsProps = {
  categories: string[];
};

const PROJECTS_PER_PAGE = 6;

export default function FilterControls({ categories }: FilterControlsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = activeCategory === 'All'
    ? mockProjects
    : mockProjects.filter(p => p.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };
  
  // Reset to page 1 when category changes
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex justify-center flex-wrap gap-2 my-10">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => handleCategoryClick(category)}
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
        {currentProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
            <Button
            variant="outline"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
            </span>
            <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            >
            Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
      )}
    </>
  );
}
