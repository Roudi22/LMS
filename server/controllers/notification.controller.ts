import NotificationModel from "../models/notification.model";
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";

// get all notifications -- only for admin
export const getNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.statusCode, error.message));
    }
  }
);

// update notification status -- only for admin
export const updateNotification = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler(404, "Notification not found"));
      }
      notification.status
        ? (notification.status = "read")
        : (notification.status = "unread");
      await notification.save();
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      }); // get all notifications after updating the status of the notification and sort them by createdAt
      res.status(200).json({
        success: true,
        notifications,
      }); // return the notifications
    } catch (error: any) {
      return next(new ErrorHandler(error.statusCode, error.message)); // return the error
    }
  }
);

// delete read notifications -- only for admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  try {
    await NotificationModel.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDaysAgo },
    }); // delete all read notifications older than 30 days
  } catch (error: any) {
    console.log(error.message); // log the error message
  }
});
