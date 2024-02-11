import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getCoursesDataAnalytics, getOrdersDataAnalytics, getUserDataAnalytics } from "../controllers/analytics.controller";

const analyticsRouter = express.Router();
analyticsRouter.get("/get-user-data-analytics", isAutheticated, authorizeRoles("admin"), getUserDataAnalytics);
analyticsRouter.get("/get-courses-data-analytics", isAutheticated, authorizeRoles("admin"), getCoursesDataAnalytics);
analyticsRouter.get("/get-orders-data-analytics", isAutheticated, authorizeRoles("admin"), getOrdersDataAnalytics);
export default analyticsRouter;