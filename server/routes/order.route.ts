import express from "express";
import { newOrder } from "../services/order.service";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createOrder, getAllOrders } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/new-order",isAutheticated, createOrder);
orderRouter.get("/get-all-orders",isAutheticated,authorizeRoles("admin"), getAllOrders);

export default orderRouter;