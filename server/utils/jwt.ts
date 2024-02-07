require("dotenv").config();
import { Response } from "express";
import { IUser } from "../models/user.model";
import {redis} from "./redis";

interface ITokenOptions {
  expire: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const accessTokenExpire = parseInt(
  (process.env.ACCESS_TOKEN_EXPIRES_TIME as string) || "300",
  10
);
export const refreshTokenExpire = parseInt(
  (process.env.REFRESH_TOKEN_EXPIRES_TIME as string) || "1200",
  10
);

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expire: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
};
export const refreshTokenOptions: ITokenOptions = {
  expire: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production" ? true : false,
};
export const sendToken = (res: Response, user: IUser, statusCode: number) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload session to redis
    redis.set(user._id, JSON.stringify(user) as any)

  // parse environment variables to integers with fallback values
  

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user,
  });
};
