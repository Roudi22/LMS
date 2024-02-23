"use client";
import React, { useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  return (
    <div>
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
