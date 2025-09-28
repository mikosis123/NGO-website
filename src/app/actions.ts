'use server';

import { generateHomepageHighlights, GenerateHomepageHighlightsOutput } from '@/ai/flows/generate-homepage-highlights';
import { mockProjects, mockImpactMetrics } from '@/lib/mock-data';

// A map to cache the results to avoid repeated API calls during development/hot-reloading
const cache = new Map<string, GenerateHomepageHighlightsOutput>();

export async function getHomepageHighlights() {
  const cacheKey = 'homepageHighlights';
  
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const highlights = await generateHomepageHighlights({
      recentProjects: mockProjects.slice(0, 2).map(p => `${p.title}: ${p.description}`),
      impactData: 'We have reached over 1,000 beneficiaries and completed 50+ projects over 20 years of service in 15 countries.',
      keyMetrics: mockImpactMetrics.map(m => `${m.label}: ${m.value}`).join(', '),
    });
    cache.set(cacheKey, highlights);
    return highlights;
  } catch (error) {
    console.error('Error generating homepage highlights:', error);
    return {
      highlightedStories: [
        'Empowering local farmers with sustainable techniques for a brighter future.',
        'Bringing essential medical services to remote and underserved areas.',
        'Providing technology education and career opportunities for underprivileged youth.',
        'Replanting native trees to combat deforestation and restore vital ecosystems.'
      ]
    };
  }
}
