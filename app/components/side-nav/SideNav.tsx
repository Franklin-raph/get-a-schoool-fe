import React from 'react'
import { IoIosLogOut } from 'react-icons/io';
import Link from 'next/link';
import { LuLayoutGrid } from 'react-icons/lu';
import { usePathname } from 'next/navigation'; // For Next.js App Router
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { BiHome } from 'react-icons/bi';

interface Toggle {
  toggleNav: boolean;
  setToggleNav: (toggle: boolean) => void;
}

interface ToggleProps {
  toggle: Toggle
}

const SideNav = ({toggle}: ToggleProps) => {
  const pathname = usePathname(); // Get the current path using App Router
  
  return (
    <div className={`bg-[#121212] scrollbar lg:w-[22%] w-[100%] h-[100vh] top-0 fixed overflow-y-auto py-5 overflow-x-hidden 
      ${toggle.toggleNav 
        ? 'lg:left-0 left-0 transition-[0.5s]' 
        : 'lg:left-0 left-[100%] transition-[0.5s]'
      } z-[10]`}>
        <div className='px-5 pb-5 flex items-center justify-between'>
            <img src="./images/logo-white.svg" alt="" />
            <p 
              onClick={() => toggle.setToggleNav(false)}
              className='text-white text-[22px] cursor-pointer lg:hidden block'
            >
              &times;
            </p>
        </div>
        <div className="my-10 text-white w-full">
          <p className='text-center text-[25px] mb-5 text-[#FFF]'>Get A School</p>
          {/* <p className="text-[12px] text-[#6F7975] mb-2">MAIN MENU</p> */}
          <Link href='/' className={pathname === '/my-properties' ? `flex items-center justify-between py-[12px] bg-[#FF0200] pl-[15px] hover:bg-[#FF0200] hover:text-white ml-2` :`hover:bg-[#FF0200] ml-2 pl-[15px] flex items-center justify-between py-[12px]`}>
            <div className="flex items-center gap-2">
              <BiHome />
              <p>Home</p>
            </div>
          </Link>
          <Link href='/dashboard' className={pathname === '/dashboard' ? `flex items-start justify-start py-[12px] bg-[#FF0200] pl-[15px] hover:bg-[#FF0200] hover:text-white ml-2` :`hover:bg-[#FF0200] ml-2 pl-[15px] flex items-center justify-start py-[12px]`}>
            <div className="flex items-center gap-2">
              <LuLayoutGrid />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link href='/my-profile' className={pathname === '/my-profile' ? `flex items-center justify-between py-[12px] bg-[#FF0200] pl-[15px] hover:bg-[#FF0200] hover:text-white ml-2` :`hover:bg-[#FF0200] ml-2 pl-[15px] flex items-center justify-between py-[12px]`}>
            <div className="flex items-center gap-2">
              <HiOutlineUserCircle />
              <p>My Profile</p>
            </div>
          </Link>
          <Link href='/account-settings' className={pathname === '/account-settings' ? `flex items-center justify-between py-[12px] bg-[#FF0200] pl-[15px] hover:bg-[#FF0200] hover:text-white ml-2` :`hover:bg-[#FF0200] ml-2 pl-[15px] flex items-center justify-between py-[12px]`}>
            <div className="flex items-center gap-2">
              <IoSettingsOutline />
              <p>Settings</p>
            </div>
          </Link>
          {/* Rest of the navigation menu items remain the same */}
          
          <div className="flex items-center cursor-pointer py-[10px] lg:hidden" onClick={() => {
                localStorage.clear()
                sessionStorage.clear()
                window.location.href = '/'
          }}>
            <IoIosLogOut fontSize={"20px"}/>
            <p className="ml-[15.67px]">Log-out</p>
          </div>
        </div>
    </div>
  )
}

export default SideNav