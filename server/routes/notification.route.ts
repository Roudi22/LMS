import express from "express";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const notificationRouter = express.Router();

notificationRouter.get("/get-notifications",isAutheticated,authorizeRoles("admin"),getNotifications);
notificationRouter.put("/update-notification/:id",isAutheticated,authorizeRoles("admin"),updateNotification);

export default notificationRouter;