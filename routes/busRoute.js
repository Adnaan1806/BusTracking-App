import express from "express";
import { addBus, getAllBuses, editBus, deleteBus, getBusById } from "../controllers/busController.js";

const router = express.Router();

router.post("/", addBus);
router.get("/", getAllBuses);
router.put("/:id", editBus);
router.delete("/:id", deleteBus);
router.get("/:id", getBusById);

export default router;
