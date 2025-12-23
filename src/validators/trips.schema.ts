import { z } from "zod";

export const tripSchema = z
  .object({
    userId: z.string(),

    date: z.string(),
    time: z.string(),

    returnDate: z.string().optional(),
    returnTime: z.string().optional(),

    fromAddress: z.string(),
    toAddress: z.string(),

    people: z.coerce.number().min(1),
    wheelchair: z.boolean(),
    tripCategory: z.string().optional(),

    price: z.number().optional(),
  })
  .refine(
    (data) =>
      (!data.returnDate && !data.returnTime) ||
      (data.returnDate && data.returnTime),
    {
      message: "Både returdatum och returtid måste anges för tur & retur",
      path: ["returnTime"],
    }
  );

export type TripInput = z.infer<typeof tripSchema>;
