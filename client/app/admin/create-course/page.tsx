"use client";
import React from "react";
import AdminSidebar from "@/app/components/admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import CreateCourse from "@/app/components/admin/course/CreateCourse";
import DashboardHeader from "@/app/components/admin/DashboardHeader";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Create Course"
        description="Endless Dev is the vision of easy learning"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500:w-[16%] w-[250px]">
            <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHeader />
            <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
