import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import busRoute from "./routes/busRoute.js";
import routeRoute from "./routes/routeRoute.js";
import tripRoute from "./routes/tripRoute.js";
import locationRoute from "./routes/locationRoute.js";
import userRoute from "./routes/userRoute.js";
import BusLiveMovement from "./services/liveLocation.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
    BusLiveMovement();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/users", userRoute);
app.use("/api/buses", busRoute);
app.use("/api/routes", routeRoute);
app.use("/api/trips", tripRoute);
app.use("/api/locations", locationRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  setInterval(BusLiveMovement, 40000);
});
