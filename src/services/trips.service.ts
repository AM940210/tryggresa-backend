import { tripsRepository } from "../repositories/trips.repository";
import { TripInput } from "../validators/trips.schema";

export type CreateTripInput = TripInput & {
  userId: string;
};

export const tripsService = {
  async createTrip(data: CreateTripInput) {
    return tripsRepository.create(data);
  },

  async getTrips() {
    return tripsRepository.findAll();
  },

  async getMyTrips(userId: string) {
    return tripsRepository.findByUserId(userId);
  },
};
