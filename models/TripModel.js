import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  tripId: { type: String, required: true, unique: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date },                    
  status: { 
    type: String, 
    enum: ["scheduled", "enroute", "completed", "cancelled"], 
    default: "scheduled" 
  },
  Date: { type: String, required: true }
});

export default mongoose.model("Trip", tripSchema);
