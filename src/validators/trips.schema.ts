// Zod schema för att validera inkommande request-body.
import { z } from "zod";

export const tripSchema = z.object({
    date: z.string(),
    time: z.string(),
    fromAddress: z.string().optional(),
    toAddress: z.string().optional(),
    people: z.number().min(1),
    wheelchair: z.boolean()
});

export type TrypInput = z.infer<typeof tripSchema>;