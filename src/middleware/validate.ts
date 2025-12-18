// Error handler & validation middleware.
import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                error: "Validation failed",
                details: parsed.error.issues,
            });
        }

        req.body = parsed.data; // endats validerad data
        next(); // gå vidare till controller
    };