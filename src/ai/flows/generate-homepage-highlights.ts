'use server';

/**
 * @fileOverview Generates compelling story highlights for the homepage based on recent projects, impact data, and key metrics.
 *
 * - generateHomepageHighlights - A function that generates story highlights for the homepage.
 * - GenerateHomepageHighlightsInput - The input type for the generateHomepageHighlights function.
 * - GenerateHomepageHighlightsOutput - The return type for the generateHomepageHighlights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHomepageHighlightsInputSchema = z.object({
  recentProjects: z
    .array(z.string())
    .describe('List of recent projects with descriptions.'),
  impactData: z.string().describe('Summary of the organization impact data.'),
  keyMetrics: z.string().describe('Key metrics of the organization.'),
});
export type GenerateHomepageHighlightsInput = z.infer<
  typeof GenerateHomepageHighlightsInputSchema
>;

const GenerateHomepageHighlightsOutputSchema = z.object({
  highlightedStories: z
    .array(z.string())
    .describe('A list of compelling story highlights for the homepage.'),
});
export type GenerateHomepageHighlightsOutput = z.infer<
  typeof GenerateHomepageHighlightsOutputSchema
>;

export async function generateHomepageHighlights(
  input: GenerateHomepageHighlightsInput
): Promise<GenerateHomepageHighlightsOutput> {
  return generateHomepageHighlightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHomepageHighlightsPrompt',
  input: {schema: GenerateHomepageHighlightsInputSchema},
  output: {schema: GenerateHomepageHighlightsOutputSchema},
  prompt: `You are an expert storyteller for NGOs. Your task is to create compelling story highlights for the homepage of an organization based on the provided information.

Recent Projects: {{{recentProjects}}}
Impact Data: {{{impactData}}}
Key Metrics: {{{keyMetrics}}}

Create a list of story highlights that will immediately engage visitors and inform them about the organization impact. Each highlight should be one sentence.

{{#each highlightedStories}}- {{{this}}}\n{{/each}}`,
});

const generateHomepageHighlightsFlow = ai.defineFlow(
  {
    name: 'generateHomepageHighlightsFlow',
    inputSchema: GenerateHomepageHighlightsInputSchema,
    outputSchema: GenerateHomepageHighlightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
