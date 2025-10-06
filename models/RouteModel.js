import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  stopOrder: { type: Number, required: true }
});

const routeSchema = new mongoose.Schema({
  routeCode: { type: String, required: true, unique: true },
  routeName: { type: String, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distanceKm: { type: Number },
  stops: { type: [stopSchema], required: true }
});

export default mongoose.model("Route", routeSchema);
