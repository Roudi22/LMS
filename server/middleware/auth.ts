require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

// check if user is authenticated or not
export const isAutheticated = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
      const access_token = req.cookies.access_token as string;
  
      if (!access_token) {
        return next(
          new ErrorHandler(400,"Please login to access this resource")
        );
      }
  
      const decoded = jwt.decode(access_token) as JwtPayload;
  
      if (!decoded) {
        return next(new ErrorHandler(400,"access token is not valid"));
      }
  
      // check if the access token is expired
     
        const user = await redis.get(decoded.id);
  
        if (!user) {
          return next(
            new ErrorHandler(400,"Please login to access this resource")
          );
        }
  
        req.user = JSON.parse(user);
  
        next();
      
    }
  );

  // validate user roles
  export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!roles.includes(req.user?.role || "")) {
        return next(
          new ErrorHandler(403,`Role (${req.user?.role}) is not allowed to access this resource`)
        );
      }
      next();
    };
  };