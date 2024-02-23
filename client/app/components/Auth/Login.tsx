"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, {isSuccess,error}] = useLoginMutation(); // using the useLoginMutation hook to login the user from authApi
  const formik = useFormik({
    // formik hook to handle form state and validation
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({email,password});
    },
  });

  useEffect(() => {
    if(isSuccess){
      toast.success("Login successful");
      props.setOpen(false);
    }
    if(error){
      if("data" in error){
        const errorData = error as any
        toast.error(errorData.data.message);
    }
  }}, [isSuccess,error])
  

  const { errors, touched, values, handleChange, handleSubmit } = formik; // destructuring formik props to use in the form
  return (
    <div className="w-full">
      <h1 className="title">Login with Email and Password</h1>
      <form onSubmit={handleSubmit}>
        <label className="label" htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="example@example.com"
          className={`${
            errors.email && touched.email && "border-red-500 border"
          } input`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className="label" htmlFor="password">
            Enter your password
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Your password"
            className={`${
              errors.password && touched.password && "border-red-500 border"
            } input`}
          />
          {showPassword ? (
            <AiOutlineEye
              size={25}
              className="absolute dark:text-white text-black right-2 bottom-3 z-1 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <AiOutlineEyeInvisible
              size={25}
              className="absolute right-2 dark:text-white text-black bottom-3 z-1 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        <div className="w-full mt-5">
          <input type="submit" value="Login" className="button" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Or join with
        </h5>
        <div className="flex item-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-2" onClick={()=> signIn("google")}/>
            <AiFillGithub size={30} className="cursor-pointer ml-2s" onClick={()=> signIn("github")}/>
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
            Not have an account?{" "}
            <span
            className="text-[#2190ff] cursor-pointer pl-1"
            onClick={() => props.setRoute("Sign-up")}
            >
                Sign up
            </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
