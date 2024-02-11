import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, editCourse, getAllCourses, getAllCoursesAdmin, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post("/create-course",isAutheticated,authorizeRoles("admin"), uploadCourse);
courseRouter.put("/edit-course/:id",isAutheticated,authorizeRoles("admin"), editCourse);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/access-course/:id",isAutheticated, getCourseByUser);
courseRouter.put("/add-question",isAutheticated, addQuestion);
courseRouter.put("/add-reply",isAutheticated, addAnswer);
courseRouter.put("/add-review/:id",isAutheticated, addReview);
courseRouter.put("/add-reply-to-review/",isAutheticated,authorizeRoles("admin"), addReplyToReview);
courseRouter.get("/get-all-courses/",isAutheticated,authorizeRoles("admin"), getAllCoursesAdmin);

export default courseRouter;