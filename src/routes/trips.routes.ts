// Tar emot HTTP.requests och skickar vidare till controllers.

import { Router } from "express";
import { tripsController } from "../controllers/trips.controller";
import { validate } from "../middleware/validate";
import { tripSchema } from "../validators/trips.schema";

const router = Router();

router.post ("/available-times", tripsController.getAvailableTimes);
router.post("/", validate(tripSchema), tripsController.create);
router.get("/", tripsController.getAll);

export default router;
