import express from "express";
import { addLocation, getLocationById, getAllLocations } from "../controllers/locationController.js";
import { authUser, validateUser } from "../middleware/authController.js";

const router = express.Router();

router.post("/", authUser, validateUser("Driver"), addLocation);
router.get("/latestLocation/:busId", authUser, validateUser("Admin", "Operator", "Driver", "User"), getLocationById);
router.get("/allLocations/:busId", authUser, validateUser("Admin", "Operator", "Driver", "User"), getAllLocations);

export default router;