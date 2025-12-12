import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  const trips = await prisma.trip.findMany();
  res.json(trips);
});

export default router;
