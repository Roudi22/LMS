"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const SignUp = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    // formik hook to handle form state and validation
    initialValues: {
        name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      props.setRoute("Verification");
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik; // destructuring formik props to use in the form
  return (
    <div className="w-full">
      <h1 className="title">Join us and start learning</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label className="label" htmlFor="email">
          Enter your name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Your name"
          className={`${
            errors.name && touched.name && "border-red-500 border"
          } input`}
        />
        {errors.name && touched.name && (
          <span className="text-red-500 pt-2 block">{errors.name}</span>
        )}
        </div>
        <div className="mt-5">

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
        </div>
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
          <input type="submit" value="Sign up" className="button" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
            Or join with
        </h5>
        <div className="flex item-center justify-center my-3">
            <FcGoogle size={30} className="cursor-pointer mr-2" />
            <AiFillGithub size={30} className="cursor-pointer ml-2s" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
            Already have an account?{" "}
            <span
            className="text-[#2190ff] cursor-pointer pl-1"
            onClick={() => props.setRoute("Login")}
            >
                Login
            </span>
        </h5>
      </form>
    </div>
  );
};

export default SignUp;