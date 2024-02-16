"use client"
import React, {useState} from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

type Props = {}

const Page = (props: Props) => {
  const [route, setRoute] = useState("Login")
  return (
    <div>
      <Navbar route={route} setRoute={setRoute}/>
      <Hero/>
    </div>
  )
}

export default Page;

