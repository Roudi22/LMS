"use client"
import React, { useState } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(0)
    const [courseInfo, setCourseInfo] = useState({
        name:"",
        description:"",
        price:"",
        estimatedPrice:"",
        tags:"",
        level:"",
        demoUrl:"",
        thumbnail:"",
    })
    const [benefits, setBenefits] = useState([{ title:""}]);
    const [prerequisites, setPrerequisites] = useState([{ title:""}]);
    const [courseContentData, setCourseContentData] = useState([{
        videoUrl:"",
        title:"",
        description:"",
        videoSection:"Untitled Section",
        links: [{ title:"", url:""}],
        suggestions:"",
    }]);
    const [courseData, setCourseData] = useState({})
    return (
    <div className='w-full mt-24 flex min-h-screen'>
        <div className='w-[80%] top-18'>
            {
                active === 0 && (
                    <CourseInformation
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    active={active}
                    setActive={setActive}
                    
                    />
                )
            }
        </div>
        <div className='w-[20%] h-screen fixed z-[-1] right-0'>
            <CourseOptions active={active} setActive={setActive}/>
        </div>
    </div>
  )
}

export default CreateCourse