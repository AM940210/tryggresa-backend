import { z } from "zod";

export const availableTimesSchema = z.object({
    date: z.string().min(1),
    time: z.string().min(1),
    fromAddress: z.string().min(1),
    toAddress: z.string().min(1),
    people: z.number().min(1),
    wheelchair: z.boolean(),
    tripCategory: z.string().min(1),

    returnDate: z.string().optional(),
    returnTime: z.string().optional(),
});
