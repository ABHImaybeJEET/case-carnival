'use server';
/**
 * @fileOverview This file defines a Genkit flow to generate a summary of a rider's profile based on their driving habits.
 *
 * - generateRiderProfileSummary - A function that generates the rider profile summary.
 * - GenerateRiderProfileSummaryInput - The input type for the generateRiderProfileSummary function.
 * - GenerateRiderProfileSummaryOutput - The return type for the generateRiderProfileSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRiderProfileSummaryInputSchema = z.object({
  historicalSpeedData: z
    .string()
    .describe(
      'Historical speed data of the rider, represented as a comma-separated list of numerical speed values.'
    ),
  historicalAccelerationData: z
    .string()
    .describe(
      'Historical acceleration data of the rider, represented as a comma-separated list of numerical acceleration values.'
    ),
});
export type GenerateRiderProfileSummaryInput = z.infer<
  typeof GenerateRiderProfileSummaryInputSchema
>;

const GenerateRiderProfileSummaryOutputSchema = z.object({
  riderProfileSummary: z
    .string()
    .describe(
      'A detailed yet easy-to-understand summary of the rider profile. Characterize their driving style (e.g., Aggressive, Balanced, Economical) and explain how this impacts the vehicle\'s range, battery health, and component wear.'
    ),
  suggestions: z
    .string()
    .describe(
      'Provide a bulleted list of 3-4 clear, actionable suggestions for the rider to improve driving efficiency. Include tips on smoother acceleration, optimal cruising speed, and smart charging habits to extend range and optimize battery longevity.'
    ),
});
export type GenerateRiderProfileSummaryOutput = z.infer<
  typeof GenerateRiderProfileSummaryOutputSchema
>;

export async function generateRiderProfileSummary(
  input: GenerateRiderProfileSummaryInput
): Promise<GenerateRiderProfileSummaryOutput> {
  return generateRiderProfileSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRiderProfileSummaryPrompt',
  input: {schema: GenerateRiderProfileSummaryInputSchema},
  output: {schema: GenerateRiderProfileSummaryOutputSchema},
  prompt: `You are an AI-powered driving coach for an electric vehicle platform called Swadesi Go.
  Your tone should be encouraging, insightful, and helpful.

  Analyze the provided historical speed and acceleration data to create a comprehensive rider profile.

  **Data to Analyze:**
  - Historical Speed Data (km/h): {{{historicalSpeedData}}}
  - Historical Acceleration Data (m/s²): {{{historicalAccelerationData}}}

  **Your Tasks:**

  1.  **Rider Profile Summary:**
      - Start by categorizing the rider's style (e.g., "Economical Cruiser," "Spirited Rider," "Aggressive Accelerator").
      - Provide a concise paragraph explaining what the data reveals about their habits. For example, do they accelerate sharply? Do they maintain steady speeds?
      - Explain the real-world impact of this driving style on the vehicle's battery range, long-term battery health, and maintenance needs (like brake and tire wear).

  2.  **Actionable Suggestions:**
      - Generate a bulleted list of 3-4 practical and easy-to-follow tips.
      - Suggestions should be directly related to the analyzed data.
      - Examples of suggestions could include:
        - "Try to keep your acceleration values below 3.0 m/s² for a smoother, more efficient ride."
        - "Maintaining a steady speed around 60-65 km/h, when possible, will maximize your range."
        - "For optimal battery health, consider charging to 80% for daily use and only to 100% for long trips."

  Your response should be structured to directly feed into the defined output schema.
  `,
});

const generateRiderProfileSummaryFlow = ai.defineFlow(
  {
    name: 'generateRiderProfileSummaryFlow',
    inputSchema: GenerateRiderProfileSummaryInputSchema,
    outputSchema: GenerateRiderProfileSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
