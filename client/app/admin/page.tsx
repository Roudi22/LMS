"use client"
import AdminSidebar from '../components/admin/sidebar/AdminSidebar'
import React from 'react'
import Heading from '../utils/Heading'
import DashboardHero from '../components/admin/DashboardHero'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
      title='admin dashboard'
      description='This is the admin dashboard'
      keywords='admin, dashboard'
      />
      <div className='flex h-[200vh]'>
        <div className='1500px:w-[16%] w-1/5'>
          <AdminSidebar />
        </div>
        <div className='w-[85%]'>
          <DashboardHero />
        </div>
      </div>
    </div>
  )
}

export default page