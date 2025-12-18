// Sätter upp Express, routes och middleware.
import express from "express";
import cors from "cors";
import tripsRouter from "./routes/trips.routes";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/trips", tripsRouter);

// Error handler 
app.use(errorHandler);