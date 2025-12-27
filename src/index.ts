import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.routes";
import authRoutes from "./routes/auth.routes";
import { Request, Response } from "express";



const app = express();


app.use(cors());
app.use(express.json());

// Base route
app.get("/", (_req, res) => {
    res.send("Backend is running!");
})


// routes
app.use("/trips", tripRoutes);
app.use("/api/auth", authRoutes);



const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:4000");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("API running");
});

