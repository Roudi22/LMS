import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getUserDataAnalytics } from "../controllers/analytics.controller";

const analyticsRouter = express.Router();
analyticsRouter.get("/get-user-data-analytics", isAutheticated, authorizeRoles("admin"), getUserDataAnalytics);
export default analyticsRouter;