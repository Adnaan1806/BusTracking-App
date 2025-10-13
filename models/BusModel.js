import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNo: { type: String, unique: true, required: true },
  busName: { type: String, required: true },
  numberPlate: { type: String, required: true },
  passengerCount: { type: Number, required: true },
  active: { type: Boolean, default: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  latestStop: { type: Number, default: 0 },
  currentLat: { type: Number, default: null },
  currentLng: { type: Number, default: null },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model("Bus", busSchema);
