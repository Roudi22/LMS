import express from "express";
import { newOrder } from "../services/order.service";
import { isAutheticated } from "../middleware/auth";
import { createOrder } from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/new-order",isAutheticated, createOrder);

export default orderRouter;