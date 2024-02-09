import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, {IOrder} from "../models/order.model";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";

// Create a new order => /api/v1/order/new
export const newOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            courseId,
            payment_info
        } = req.body;
        const user = await userModel.findById(req.user?.id);
        const coursePurchased = user?.courses.some((course: any) => course.toString() === courseId);
        if(coursePurchased){
            return next(new ErrorHandler(400, 'You have already purchased this course'));
        }
        const course = await CourseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler(404, 'Course not found'));
        }
        const data:any = {
            courseId: course?._id,
            userId: user?.id,
        }
        newOrder(data, res,next);
        const mailData= {
            order: {
                _id: course._id.slice(0,6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleString("en-Us", {year: 'numeric', month: 'long', day: 'numeric'}), // 2021, July 1


            }
        }
        const html = await ejs.renderFile(path.join(__dirname, '../mails/order-confirmation.ejs'), {mailData});
    } catch (error:any) {
        return next(new ErrorHandler(400,error.message));
    }
});