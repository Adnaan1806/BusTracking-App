import express from "express";
import { addTrip, getAllTrips, getTripById, editTrip, deleteTrip } from "../controllers/tripController.js";

const router = express.Router();

router.post("/", addTrip);
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.put("/:id", editTrip);
router.delete("/:id", deleteTrip);

export default router;
