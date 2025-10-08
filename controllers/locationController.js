import LocationModel from "../models/LocationModel.js";

const addLocation = async (req, res) => {
    try {
        const location = await LocationModel.create(req.body);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getLocationById = async (req, res) => {
    try {
        const busID = req.params.busId;
        const location = await LocationModel.findOne({ busId: busID }).sort({date: -1});
        if (!location) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllLocations = async (req, res) => {
    try {
        const busID = req.params.busId;
        const locations = await LocationModel.find({ busId: busID }).sort({date: 1});
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export{addLocation, getLocationById, getAllLocations}