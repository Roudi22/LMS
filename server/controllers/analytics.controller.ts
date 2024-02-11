import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { generateLast12MothsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";

// get user data analytics -- only for admin
export const getUserDataAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MothsData(userModel);
      res.status(200).json({
        success: true,
        message: "User data analytics",
        users
      });
    } catch (error:any) {
      next(new ErrorHandler(500, error.message));
    }
  }
);

export const getCoursesDataAnalytics = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
          const courses = await generateLast12MothsData(CourseModel);
        res.status(200).json({
          success: true,
          message: "User data analytics",
          courses
        });
      } catch (error:any) {
        next(new ErrorHandler(500, error.message));
      }
    }
  );

export const getOrdersDataAnalytics = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
          const orders = await generateLast12MothsData(OrderModel);
        res.status(200).json({
          success: true,
          message: "User data analytics",
          orders
        });
      } catch (error:any) {
        next(new ErrorHandler(500, error.message));
      }
    }
  );
