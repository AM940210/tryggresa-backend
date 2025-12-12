// Business logic (t.ex. skapa resa).
import { tripsRepository } from "../repositories/trips.repository";
import { TripInput } from "../validators/trips.schema";

export const tripsService = {
    async createTrip(data: TripInput) {
        return tripsRepository.create(data);
    },

    async getTrips() {
        return tripsRepository.findAll();
    },
};