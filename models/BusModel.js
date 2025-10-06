import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busNo: { type: String, unique: true, required: true },
  busName: { type: String, required: true },
  numberPlate: { type: String, required: true },
  passengerCount: { type: Number, required: true },
  active: { type: Boolean, default: true },
});

export default mongoose.model("Bus", busSchema);
