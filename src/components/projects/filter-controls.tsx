
'use client';

import { useState } from 'react';
import ProjectCard from './project-card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Project } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader } from '../ui/card';

type FilterControlsProps = {
  categories: string[];
  projects: Project[];
  loading: boolean;
};

const PROJECTS_PER_PAGE = 4;

function ProjectCardSkeleton() {
    return (
        <Card className="flex flex-col h-full overflow-hidden">
            <CardHeader className="p-0 relative h-48">
                <Skeleton className="h-full w-full" />
            </CardHeader>
            <CardContent className="flex-grow p-4">
                <Skeleton className="h-4 w-1/4 mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
            </CardContent>
            <div className="p-4 pt-0">
                <Skeleton className="h-5 w-24" />
            </div>
        </Card>
    )
}

export default function FilterControls({ categories, projects, loading }: FilterControlsProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

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

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {[...Array(PROJECTS_PER_PAGE)].map((_, i) => (
                 <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                    <ProjectCardSkeleton />
                </motion.div>
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
            {currentProjects.map((project, i) => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                >
                    <ProjectCard project={project} />
                </motion.div>
            ))}
        </div>
      )}


      {totalPages > 1 && !loading && (
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
