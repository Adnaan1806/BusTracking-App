import Tripmodel from "../models/TripModel.js";

const addTrip = async (req, res) => {
  try {
    const trip = await Tripmodel.create(req.body);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTrips = async (req, res) => {
    try {
        const trips = await Tripmodel.find()
        .populate("busId", "busNo busName numberPlate")
        .populate("routeId", "routeCode name origin destination");
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTripById = async (req, res) => {
    try {
        const trip = await Tripmodel.findById(req.params.id)
        .populate("busId", "busNo busName numberPlate")
        .populate("routeId", "routeCode name origin destination");
        if (!trip) return res.status(404).json({ message: "Trip not found" });
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editTrip = async (req, res) => {
    try {
      const trip = await Tripmodel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.status(200).json(trip);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const deleteTrip = async (req, res) => {
    try {
      const trip = await Tripmodel.findByIdAndDelete(req.params.id);
      if (!trip) return res.status(404).json({ message: "Trip not found" });
      res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

export { addTrip, getAllTrips, getTripById, editTrip, deleteTrip };
