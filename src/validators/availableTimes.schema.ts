import { z } from "zod";

export const availableTimesSchema = z.object({
  date: z.string().min(1, "Datum krävs"),
  fromAddress: z.string().min(1).optional(),
  toAddress: z.string().min(1).optional(),
  tripType: z.enum(["oneway", "return"]),
});
