// Alla kommunikation med databasen (Prisma).
import prisma from "../lib/prisma";
import { CreateTripInput } from "../services/trips.service";

export const tripsRepository = {
  create(data: CreateTripInput) {
    return prisma.trip.create({
      data: {
        ...data,
      },
    });
  },

  async findAll() {
    return prisma.trip.findMany({
      orderBy: { date: "desc" },
    });
  },

  async findByUserId(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
  },
};
