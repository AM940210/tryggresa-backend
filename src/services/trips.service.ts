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

  // steg 4 dynamiska tider
  async getAvailableTimes(date: string) {
    const allTimes = generateAllTimes();
    const bookedTimes = await tripsRepository.findBookedTimesByDate(date);

    const today = new Date().toISOString().split("T")[0];
    const nowTime = new Date().toTimeString().slice(0, 5);

    return allTimes.filter((time) => {
      // tabort bokade tider
      if (bookedTimes.includes(time)) return false;

      // tabort tider i dåtid om idag
      if (date === today && time <= nowTime) return false;

      return true;
    });
  },
};


export function generateAllTimes() {
  const times: string[] = [];

  let hour = 9;
  let minute = 0;

  while (hour < 16) {
    const h = hour.toString().padStart(2, "0");
    const m = minute.toString().padStart(2, "0");

    times.push(`${h}:${m}`);

    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }

  return times;
}