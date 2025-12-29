import { z } from "zod";

export const availableTimesSchema = z.object({
  date: z.string().min(1, "Datum krävs"),
  fromAddress: z.string().min(1, "Från-adress krävs"),
  toAddress: z.string().min(1, "Till-adress krävs"),
  tripType: z.enum(["oneway", "return"]),
});
