// Tar emot HTTP.requests och skickar vidare till controllers.

import { Router } from "express";
import { tripsController } from "../controllers/trips.controller";
import { validate } from "../middleware/validate";
import { tripsSchema } from "../validators/trips.schema";

const router = Router();

router.post("/", validate(tripsSchema), tripsController.create);
router.get("/", tripsController.getAll);

export default router;
