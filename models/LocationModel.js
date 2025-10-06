import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Location", locationSchema);
