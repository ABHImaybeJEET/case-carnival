'use server';

/**
 * @fileOverview Explains detected anomalies, their importance, and recommends actions.
 *
 * - explainAnomaly - A function that takes anomaly data and provides an explanation, importance, and recommended actions.
 * - ExplainAnomalyInput - The input type for the explainAnomaly function.
 * - ExplainAnomalyOutput - The return type for the explainAnomaly function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAnomalyInputSchema = z.object({
  anomalyType: z.string().describe('The type of anomaly detected (e.g., battery drain, motor malfunction).'),
  component: z.string().describe('The component affected by the anomaly (e.g., battery, motor, brakes).'),
  severity: z.string().describe('The severity level of the anomaly (e.g., low, medium, high).'),
  sensorData: z.string().describe('Relevant sensor data associated with the anomaly.'),
  timestamp: z.string().describe('The timestamp when the anomaly was detected.'),
});

export type ExplainAnomalyInput = z.infer<typeof ExplainAnomalyInputSchema>;

const ExplainAnomalyOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the anomaly.'),
  importance: z.string().describe('Why this anomaly is important and potential consequences.'),
  recommendedActions: z.string().describe('Recommended actions to address the anomaly.'),
});

export type ExplainAnomalyOutput = z.infer<typeof ExplainAnomalyOutputSchema>;

export async function explainAnomaly(input: ExplainAnomalyInput): Promise<ExplainAnomalyOutput> {
  return explainAnomalyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainAnomalyPrompt',
  input: {schema: ExplainAnomalyInputSchema},
  output: {schema: ExplainAnomalyOutputSchema},
  prompt: `You are an AI assistant specializing in explaining anomalies detected in electric vehicles.

  Given the following information about a detected anomaly, provide a clear and concise explanation of what the anomaly is, why it is important, and what actions should be taken to address it.

  Anomaly Type: {{{anomalyType}}}
  Component: {{{component}}}
  Severity: {{{severity}}}
  Sensor Data: {{{sensorData}}}
  Timestamp: {{{timestamp}}}

  Explanation:
  Importance:
  Recommended Actions:`,
});

const explainAnomalyFlow = ai.defineFlow(
  {
    name: 'explainAnomalyFlow',
    inputSchema: ExplainAnomalyInputSchema,
    outputSchema: ExplainAnomalyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
