'use client';

import { useState, useTransition, useEffect } from 'react';
import { Wand2, AlertTriangle, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getHomepageHighlights } from '@/app/actions';
import { Skeleton } from '../ui/skeleton';

type HighlightsState = {
  stories: string[];
  error?: string;
};

export default function AiHighlights() {
  const [isPending, startTransition] = useTransition();
  const [highlights, setHighlights] = useState<HighlightsState | null>(null);

  const fetchHighlights = () => {
    startTransition(async () => {
      const result = await getHomepageHighlights();
      if (result && result.highlightedStories) {
        setHighlights({ stories: result.highlightedStories });
      } else {
        setHighlights({ stories: [], error: 'Could not generate stories.' });
      }
    });
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-background/70 p-6 rounded-lg shadow-inner">
        {isPending && !highlights ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : highlights?.error ? (
          <div className="text-center text-destructive flex items-center justify-center gap-2">
            <AlertTriangle />
            <p>{highlights.error}</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {highlights?.stories.map((story, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="ml-2 text-lg text-foreground/90">{story}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="text-center mt-6">
        <Button onClick={fetchHighlights} disabled={isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wand2 className="mr-2 h-5 w-5" />
          {isPending ? 'Generating...' : 'Generate New Highlights'}
        </Button>
      </div>
    </div>
  );
}
