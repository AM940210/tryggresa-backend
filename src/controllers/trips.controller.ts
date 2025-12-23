// Tar emot request-data, skickar till service, svarar till klienten.
import { Request, Response, NextFunction } from "express";
import { tripsService } from "../services/trips.service";

export const tripsController = {

    // Skapa enkel resa eller tur & retur
    async create(req: any, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const userId = req.user!.userId;

            // Skapa utresa (ALLTID pris 125)
            const tripOut = await tripsService.createTrip({
                userId,
                date: data.date,
                time: data.time,
                fromAddress: data.fromAddress,
                toAddress: data.toAddress,
                people: data.people,
                wheelchair: data.wheelchair,
                tripCategory: data.tripCategory,
                price: 125,
            });

            let tripReturn = null;

            // Skapa returresa om tur & retur är valt
            if (data.returnDate && data.returnTime) {
                tripReturn = await tripsService.createTrip({
                    userId,
                    date: data.returnDate,
                    time: data.returnTime,
                    fromAddress: data.toAddress,
                    toAddress: data.fromAddress,
                    people: data.people,
                    wheelchair: data.wheelchair,
                    tripCategory: data.tripCategory,
                    price: 125,
                });
            }

            res.json({
                tripOut,
                tripReturn,
                totalPrice: tripReturn ? 250 : 125,
                message: data.wheelchair
                ? "Rullstolsplats registrerad - fordon med ramp skickas."
                : "Ingen rullstolsplats behövs.",
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
            const { date } = req.body;

            const times = await tripsService.getAvailableTimes(date);
            res.json({ times });

        } catch (err) {
            next(err);
        }
    },

    async getMyBookings(req: any, res: Response, next: NextFunction
    ) {
        try {
            const userId = req.user.userId;
            const trips = await tripsService.getMyTrips(userId);
            res.json(trips);
        } catch (err) {
            next(err);
        }
    },

    async cancelTrip(req: any, res:Response, next: NextFunction) {
        try {
            const userId = req.user.userId;
            const tripId = req.params.id;

            await tripsService.cancelTrip(tripId, userId);

            res.json({ message: "Resan är avbokad"});
        } catch (err) {
            next(err);
        }
    },
        
};
