import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { generateLast12MothsData } from "../utils/analytics.generator";
import userModel from "../models/user.model";

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
