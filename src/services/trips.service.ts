// Business logic (t.ex. skapa resa).
import { tripsRepository } from "../repositories/trips.repository";
import { TripInput } from "../validators/trips.schema";

function calculatePrice() {
    return 125;
}

export const tripsService = {
    async createTrip(data: TripInput) {
        return tripsRepository.create(data);
        const price = calculatePrice();

        return tripsRepository.create({
            ...data,
            price
        });
    },

    async getTrips() {
        return tripsRepository.findAll();
    },
};