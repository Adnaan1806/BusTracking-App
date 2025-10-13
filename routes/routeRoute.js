import express from "express";
import { addRoute, getAllRoutes, editRoute, deleteRoute, getRouteById } from "../controllers/routeController.js";
import { authUser, validateUser } from "../middleware/authController.js";

const router = express.Router();

router.post("/", authUser, validateUser("Admin", "Operator"), addRoute);
router.get("/", authUser, validateUser("Admin", "Operator", "Driver", "User"), getAllRoutes);
router.put("/:id", authUser, validateUser("Admin", "Operator"), editRoute);
router.delete("/:id", authUser, validateUser("Admin", "Operator"), deleteRoute);
router.get("/:id", authUser, validateUser("Admin", "Operator", "Driver", "User"), getRouteById);

export default router;
