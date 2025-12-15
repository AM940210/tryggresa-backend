// Tar emot request-data, skickar till service, svarar till klienten.
import { Request, Response, NextFunction } from "express";
import { tripsService } from "../services/trips.service";

export const tripsController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const trip = await tripsService.createTrip(req.body);

            // Dynamiskt svar beronde på rullstol
            const message = trip.wheelchair
                ? "Rullstolsplats är registrerad och fordon med ramp skickas."
                : "Ingen rullstolsplats behövs.";

            res.json({
                ...trip,
                message
            });
        } catch (err) {
            next(err);
        }
    },

    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const trips = await tripsService.getTrips();
            res.json(trips);
        } catch (err) {
            next(err);
        }
    }
};