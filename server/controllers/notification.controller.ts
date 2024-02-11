import NotificationModel from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

// get all notifications -- only for admin
export const getNotifications = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await NotificationModel.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            notifications
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
})

// update notification status -- only for admin
export const updateNotification = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notification = await NotificationModel.findById(req.params.id);
        if(!notification){
            return next(new ErrorHandler( 404 ,"Notification not found"));
        }
        notification.status ? notification.status = "read" : notification.status = "unread";
        await notification.save();
        const notifications = await NotificationModel.find().sort({createdAt: -1});
        res.status(200).json({
            success: true,
            notifications
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.statusCode, error.message));
    }
})