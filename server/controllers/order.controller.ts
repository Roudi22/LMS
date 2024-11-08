import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { newOrder } from "../services/order.service";
import { get } from "http";
import { getAllOrdersService } from "../services/order.service";

// Create a new order => /api/v1/order/new
export const createOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      const user = await userModel.findById(req.user?._id);
      const coursePurchased = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );
      if (coursePurchased) {
        return next(
          new ErrorHandler(400, "You have already purchased this course")
        );
      }
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(404, "Course not found"));
      }
      const data: any = {
        courseId: course._id,
        userId: user?.id,
        payment_info,
      };
      
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleString("en-Us", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }), // 2021, July 1
        },
      };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );
      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Course Purchased",
            template: "order-confirmation",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(400, error.message));
      }
      user?.courses.push(course?._id);
      await user?.save();
       await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course.name}`,
      });
      course.purchased = course.purchased ? course.purchased + 1 : 1;
      await course.save();
      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

// get all oders -- only for admin
export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);
