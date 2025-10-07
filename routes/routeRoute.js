import express from "express";
import { addRoute, getAllRoutes, editRoute, deleteRoute, getRouteById } from "../controllers/routeController.js";

const router = express.Router();

router.post("/", addRoute);
router.get("/", getAllRoutes);
router.put("/:id", editRoute);
router.delete("/:id", deleteRoute);
router.get("/:id", getRouteById);

export default router;
