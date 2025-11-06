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
      'A summary of the rider profile, characterizing their driving habits (e.g., aggressive vs. economical) and potential impact on range and maintenance.'
    ),
  suggestions: z
    .string()
    .describe(
      'Actionable suggestions for the rider to improve driving efficiency, extend range, and optimize battery health based on their profile.'
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
  prompt: `You are an AI assistant specializing in analyzing rider behavior for electric vehicles.
  You are given the rider's historical speed and acceleration data. Your task is to generate a concise summary of their rider profile,
  characterizing their driving habits (e.g., aggressive vs. economical) and the potential impact of these habits on the vehicle's range and maintenance needs.

  Also, provide a few actionable suggestions to help the rider improve their driving efficiency, extend range, and optimize battery health.

  Historical Speed Data: {{{historicalSpeedData}}}
  Historical Acceleration Data: {{{historicalAccelerationData}}}

  Based on this data, provide a rider profile summary and suggestions.
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
