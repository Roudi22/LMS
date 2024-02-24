"use client";
import React, { useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Heading from "./utils/Heading";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Heading
      title="LMS - Endless Dev"
      description="LMS is a platform for students to learn and get help from teachers"
      keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <Navbar
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <Hero />
    </div>
  );
};

export default Page;
