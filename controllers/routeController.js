import RouteModel from "../models/RouteModel.js";

const addRoute = async (req, res) => {
    try {
        const route = await RouteModel.create(req.body);
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllRoutes = async (req, res) => {
    try {
        const routes = await RouteModel.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editRoute = async (req, res) => {
    try {
        const route = await RouteModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteRoute = async (req, res) => {
    try {
        const route = await RouteModel.findByIdAndDelete(req.params.id);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json({ message: "Route deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRouteById = async (req, res) => {
    try {
        const route = await RouteModel.findById(req.params.id);
        if (!route) {
            return res.status(404).json({ message: "Route not found" });
        }
        res.status(200).json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export{addRoute, getAllRoutes, editRoute, deleteRoute, getRouteById}