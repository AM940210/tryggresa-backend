// Tar emot HTTP.requests och skickar vidare till controllers.

import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { date, time, fromAddress, toAddress, people, wheelchair } = req.body;

    const trip = await prisma.trip.create({
      data: {
        date: String(date),
        time: String(time),
        fromAddress: String(fromAddress),
        toAddress: String(toAddress),
        people: Number(people),
        wheelchair: Boolean(wheelchair),
      },
    });

    res.json(trip);
  } catch (error) {
    console.error("POST /trips error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (_req, res) => {
  try {
    const trips = await prisma.trip.findMany();
    res.json(trips);
  } catch (error) {
    console.error("GET /trips error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
