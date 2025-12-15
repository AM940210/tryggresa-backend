// Zod schema för att validera inkommande request-body.
import { z } from "zod";

export const tripSchema = z.object({
    date: z.string(),
    time: z.string(),
    fromAddress: z.string().optional(),
    toAddress: z.string().optional(),
    people: z.coerce.number().min(1),
    wheelchair: z.boolean(),
    tripCategory: z.string().optional(),
});

export type TripInput = z.infer<typeof tripSchema>;