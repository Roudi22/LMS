"use client"
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Navbar from '../components/Navbar'
import Profile from '../components/Profile/Profile'
import Heading from '../utils/Heading'
import { useSelector } from 'react-redux'

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any) => state.auth);
  return (
    <div>
        <Protected>
        <Heading
      title={`${user.name} Profile - LMS - Endless Dev`}
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
      <Profile/>
        </Protected>
    </div>
  )
}

export default Page