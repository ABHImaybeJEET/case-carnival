'use server';
/**
 * @fileOverview Summarizes vehicle maintenance history and provides insights into potential future issues.
 *
 * - summarizeVehicleMaintenanceHistory - A function that handles the summarization process.
 * - SummarizeVehicleMaintenanceHistoryInput - The input type for the summarizeVehicleMaintenanceHistory function.
 * - SummarizeVehicleMaintenanceHistoryOutput - The return type for the summarizeVehicleMaintenanceHistory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeVehicleMaintenanceHistoryInputSchema = z.object({
  maintenanceHistory: z
    .string()
    .describe(
      'A detailed record of the vehicles maintenance history, including dates, services performed, and any issues encountered.'
    ),
  vehicleType: z.string().describe('The type of vehicle, e.g., two-wheeler EV'),
});
export type SummarizeVehicleMaintenanceHistoryInput = z.infer<
  typeof SummarizeVehicleMaintenanceHistoryInputSchema
>;

const SummarizeVehicleMaintenanceHistoryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the vehicle maintenance history.'),
  potentialIssues: z
    .string()
    .describe(
      'Insights into potential future issues based on the maintenance history, such as recurring problems or components nearing end-of-life.'
    ),
});
export type SummarizeVehicleMaintenanceHistoryOutput = z.infer<
  typeof SummarizeVehicleMaintenanceHistoryOutputSchema
>;

export async function summarizeVehicleMaintenanceHistory(
  input: SummarizeVehicleMaintenanceHistoryInput
): Promise<SummarizeVehicleMaintenanceHistoryOutput> {
  return summarizeVehicleMaintenanceHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeVehicleMaintenanceHistoryPrompt',
  input: {schema: SummarizeVehicleMaintenanceHistoryInputSchema},
  output: {schema: SummarizeVehicleMaintenanceHistoryOutputSchema},
  prompt: `You are an expert vehicle mechanic specializing in {{{{vehicleType}}}}. You will summarize the provided maintenance history and identify potential future issues based on this history.

Maintenance History: {{{{maintenanceHistory}}}}

Summary:
Potential Issues:
`,
});

const summarizeVehicleMaintenanceHistoryFlow = ai.defineFlow(
  {
    name: 'summarizeVehicleMaintenanceHistoryFlow',
    inputSchema: SummarizeVehicleMaintenanceHistoryInputSchema,
    outputSchema: SummarizeVehicleMaintenanceHistoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
