import { z } from "zod";

export const tripSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),

    date: z.string().min(1),
    time: z.string().min(1),

    returnDate: z.string().optional(),
    returnTime: z.string().optional(),

    fromAddress: z.string().optional(),
    toAddress: z.string().optional(),

    people: z.coerce.number().min(1),
    wheelchair: z.boolean(),

    tripCategory: z.enum(["sjukresa", "färdtjänst"]).optional(),
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
