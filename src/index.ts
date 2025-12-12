import express from "express";
import cors from "cors";
import tripRoutes from "./routes/trips";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/trips", tripRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
