import express from "express";
import { addLocation, getLocationById, getAllLocations } from "../controllers/locationController.js";

const router = express.Router();

router.post("/", addLocation);
router.get("/latestLocation/:busId", getLocationById);
router.get("/allLocations/:busId", getAllLocations);

export default router;