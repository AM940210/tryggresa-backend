// Tar emot request-data, skickar till service, svarar till klienten.
import { Request, Response, NextFunction } from "express";
import { tripsService } from "../services/trips.service";

export const tripsController = {

    // Skapa enkel resa eller tur & retur
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;

            // Skapa utresa
            const tripOut = await tripsService.createTrip({
                date: data.date,
                time: data.time,
                fromAddress: data.fromAddress,
                toAddress: data.toAddress,
                people: data.people,
                wheelchair: data.wheelchair,
                tripCategory: data.tripCategory
            });

            let tripReturn = null;

            // Skapa returresa om tur & retur är valt
            if (data.returnDate && data.returnTime) {
                tripReturn = await tripsService.createTrip({
                    date: data.returnDate,
                    time: data.returnTime,
                    fromAddress: data.toAddress,
                    toAddress: data.fromAddress,
                    people: data.people,
                    wheelchair: data.wheelchair,
                    tripCategory: data.tripCategory
                });
            }

            res.json({
                tripOut,
                tripReturn,
                message: data.wheelchair
                    ? "Rullstolsplats registrerad – fordon med ramp skickas."
                    : "Ingen rullstolsplats behövs."
            });

        } catch (err) {
            next(err);
        }
    },

    // Hämta alla resor
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const trips = await tripsService.getTrips();
            res.json(trips);
        } catch (err) {
            next(err);
        }
    },

    // Tillgängliga tider
    async getAvailableTimes(req: Request, res: Response, next: NextFunction) {
        try {
            const { date, time } = req.body;

            const times = [
                "09:00",
                "09:30",
                "10:00",
                "10:30",
                "11:00",
                "11:30",
                "12:00"
            ];

            res.json({ times });
        } catch (err) {
            next(err);
        }
    }
};
