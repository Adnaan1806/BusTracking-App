import BusModel from "../models/BusModel.js";

const addBus = async (req, res) => {
  try {
    const bus = await BusModel.create(req.body);
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllBuses = async (req, res) => {
  try {
    const buses = await BusModel.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const editBus = async (req, res) => {
  try {
    const bus = await BusModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBus = async (req, res) => {
  try {
    const bus = await BusModel.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBusById = async (req, res) => {
  try {
    const bus = await BusModel.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addBus, getAllBuses, editBus, deleteBus, getBusById };
