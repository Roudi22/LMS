import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { create } from "domain";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { getAllCoursesService } from "../services/course.service";

// upload course
export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// edit course
export const editCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// get single course --- without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        console.log("from redis");
        const course = JSON.parse(isCacheExist);
        return res.status(200).json({
          success: true,
          course,
        });
      } else {
        console.log("from db");
        const course = await CourseModel.findById(courseId).select(
          "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
        );
        await redis.set(courseId, JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// get all courses --- without purchasing
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("courses");
      if (isCacheExist) {
        console.log("from redis");
        const courses = JSON.parse(isCacheExist);
        return res.status(200).json({
          success: true,
          courses,
        });
      } else {
        console.log("from db");
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestions -courseData.questions -courseData.links"
        );
        await redis.set("courses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// get course content -- only for valid user
export const getCourseByUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourses = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourses?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExist) {
        return next(
          new ErrorHandler(400, "You are not authorized to access this course")
        );
      }

      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// add question to course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}
export const addQuestion = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IAddQuestionData = req.body;
      const { question, courseId, contentId } = data;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler(400, "Invalid content id"));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler(400, "Content not found"));
      }
      // create a new question
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };
      // add question to course
      courseContent.questions.push(newQuestion);
      await NotificationModel.create({
        user: req.user?._id,
        title: "New Question Recieved",
        message: `You have a new question in ${courseContent.title} from ${req.user?.name}`,
      });
      // save course
      await course?.save();
      res.status(200).json({
        success: true,
        message: "Question added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// add reply to question
interface IAddAnswerData {
  questionId: string;
  contentId: string;
  answer: string;
  courseId: string;
}
export const addAnswer = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IAddAnswerData = req.body;
      const { questionId, contentId, answer, courseId } = data;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler(400, "Invalid content id"));
      }
      const courseContent = course?.courseData?.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler(400, "Content not found"));
      }
      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler(400, "Question not found"));
      }
      // create a new answer
      const newAnswer: any = {
        user: req.user,
        answer,
      };
      // add answer to question
      question?.questionReplies?.push(newAnswer);
      // save course
      await course?.save();
      if (req.user?._id === question.user._id) {
        // create a notification
        await NotificationModel.create({
          user: req.user?._id,
          title: "Your Question Answered",
          message: `You have a new question asnwered in ${courseContent.title} from ${req.user?.name}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
          answer,
        };
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );
        // send mail
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(500, error.message));
        }
      }
      res.status(200).json({
        success: true,
        message: "Answer added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// add review to course
interface IAddReviewData {
  rating: number;
  review: string;
  courseId: string;
  userId: string;
}
export const addReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourseList?.some(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExist) {
        return next(
          new ErrorHandler(400, "You're not eligible to review this course")
        );
      }
      const course = await CourseModel.findById(courseId);
      const { review, rating } = req.body as IAddReviewData;
      const reviewData: any = {
        user: req.user,
        rating,
        comment: review,
      };
      course?.reviews.push(reviewData);

      let avg = 0;
      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });
      if (course) {
        course.rating = avg / course?.reviews.length;
      }
      console.log(avg);
      await course?.save();
      const notification = {
        title: "New review recieved",
        message: `${req.user?.name} has reviewed your course ${course?.name}`,
      };

      // create a notification

      res.status(200).json({
        success: true,
        message: "Review added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// add reply in review
interface IAddReplyToReviewData {
  comment: string;
  reviewId: string;
  courseId: string;
}
export const addReplyToReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as IAddReplyToReviewData;
      const { comment, reviewId, courseId } = data;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(400, "Course not found"));
      }
      const review = course?.reviews.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler(400, "Review not found"));
      }
      const newReplyToReview: any = {
        user: req.user,
        comment,
      };
      if(!review.commentReplies) {
        review.commentReplies = [];
      }
      review?.commentReplies.push(newReplyToReview);
      await course?.save();
      res.status(200).json({
        success: true,
        message: "Reply added successfully",
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// get all courses -- only for admin
export const getAllCoursesAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);

// delete course -- only for admin
export const deleteCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await CourseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler(404, "Course not found"));
      }
      await course.deleteOne({ id });
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  })