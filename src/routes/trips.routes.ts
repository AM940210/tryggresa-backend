// Tar emot HTTP.requests och skickar vidare till controllers.

import { Router } from "express";
import { tripsController } from "../controllers/trips.controller";
import { validate } from "../middleware/validate";
import { tripSchema } from "../validators/trips.schema";
import { availableTimesSchema } from "../validators/availableTimes.schema";

const router = Router();

// AVAILABLE TIMES (med validering)
router.post (
    "/available-times",
    validate(availableTimesSchema),
    tripsController.getAvailableTimes
);

// CREATE TRIP (med validering)
router.post(
    "/", 
    validate(tripSchema), 
    tripsController.create
);

// GET ALL
router.get("/", tripsController.getAll);

export default router;
