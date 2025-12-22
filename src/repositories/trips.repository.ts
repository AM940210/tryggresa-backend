// Alla kommunikation med databasen (Prisma).
import prisma from "../lib/prisma";
import { TripInput } from "../validators/trips.schema";

export const tripsRepository = {
  create(data: TripInput) {
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
