import express from "express";
import { addBus, getAllBuses, editBus, deleteBus, getBusById } from "../controllers/busController.js";
import { authUser, validateUser } from "../middleware/authController.js";

const router = express.Router();

router.post("/", authUser, validateUser("Admin", "Operator"), addBus);
router.get("/", authUser, validateUser("Admin", "Operator"), getAllBuses);
router.put("/:id", authUser, validateUser("Admin", "Operator"), editBus);
router.delete("/:id", authUser, validateUser("Admin", "Operator"), deleteBus);
router.get("/:id", authUser, validateUser("Admin", "Operator"), getBusById);

export default router;
