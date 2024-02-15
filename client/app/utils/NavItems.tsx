import Link from 'next/link'
import React from 'react'

export const navItemsData = [
  {
    id: 0,
    name: 'Home',
    link: '/',
  },
  {
    id: 1,
    name: 'About',
    link: '/about',
  },
  {
    id: 2,
    name: 'Courses',
    link: '/courses',
  },
  {
    id: 3,
    name: 'Policy',
    link: '/policy',
  },
  {
    id: 4,
    name: 'FAQ',
    link: '/faq',
  }
]

type Props = {
    activeItem: number,
    isMobile: boolean,
}

const NavItems = ({activeItem, isMobile}: Props) => {
  return (
    <>
      <div className='hidden 800px:flex'>
        {navItemsData && navItemsData.map((item, index) => (
          <Link passHref href={item.link} key={item.id}>
            <span
            className={`${ activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-[400]`}>
              {item.name}
            </span>
          </Link>
        ))}
      </div>
      {isMobile && (
        <div className='800px:hidden mt-5'>
          <div className='w-full text-center py-6'>
              {
                navItemsData && navItemsData.map((item, index) => (
                  <Link
              href={"/"} passHref key={item.id}>
                <span className={`${ activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"}`}>
                  {item.name}
                </span>
              </Link>
                  
                ))
              }
          </div>
        </div>
      )}
    </>
  )
}

export default NavItems