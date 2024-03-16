require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors"
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
//body parser
app.use(express.json({limit:"50mb"})) // for parsing application/json  // 50mb limit for image upload 

// cookie parser
app.use(cookieParser()) // for parsing cookies 

// cors => cross origin resource sharing
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    
}));

// routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter, layoutRouter);
// testing api
app.get("/test", (req:Request , res:Response ,next:NextFunction) => {
    res.status(200).json({message:"Hello World", success:true})
});

// unknown route
app.all("*", (req:Request , res:Response ,next:NextFunction) => {
    const err = new Error(`Route not found - ${req.originalUrl}`) as any;
    err.statusCode = 400;
    next(err);
});

app.use(ErrorMiddleware);