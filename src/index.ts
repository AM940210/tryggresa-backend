import express, { Request, Response } from "express";
import cors from "cors";
import tripRoutes from "./routes/trips.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://tryggresa-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());
app.use(express.json());

// Routes
app.use("/trips", tripRoutes);
app.use("/api/auth", authRoutes);

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("API running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
