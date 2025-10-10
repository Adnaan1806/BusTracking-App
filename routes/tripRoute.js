import express from "express";
import { addTrip, getAllTrips, getTripById, editTrip, deleteTrip } from "../controllers/tripController.js";
import { authUser, validateUser } from "../middleware/authController.js";

const router = express.Router();

router.post("/", authUser, validateUser("Admin", "Operator"), addTrip);
router.get("/", authUser, validateUser("Admin", "Operator", "Driver", "User"), getAllTrips);
router.get("/:id", authUser, validateUser("Admin", "Operator", "Driver", "User"), getTripById);
router.put("/:id", authUser, validateUser("Admin", "Operator", "Driver"), editTrip);
router.delete("/:id", authUser, validateUser("Admin", "Operator"), deleteTrip);

export default router;
