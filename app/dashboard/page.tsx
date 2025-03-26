"use client"

import React, { useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { LuHouse } from 'react-icons/lu';
import { PiMoneyWavyLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';


export default function Page() {
  const [toggleNav, setToggleNav] = useState<boolean>(false)
  const router = useRouter()

  const handleToggleNav = (value: boolean) => {
    setToggleNav(value)
  }

  return (
    <div>
      <SideNav toggle={{
        toggleNav: toggleNav, 
        setToggleNav: handleToggleNav
      }}/>
      <div className={`w-full lg:w-[78%] ml-auto pb-5 ${toggleNav ? 'lg:ml-[22%]' : 'lg:ml-auto'}`}>
        <TopNav 
          toggle={{
            toggleNav: toggleNav,
            setToggleNav: handleToggleNav
          }}
          pageTitle={'Dashboard'}
        />
        <div className='mt-8'>
          <section className="w-[95%] mx-auto md:px-[1rem] px-[0px] pb-[80px]">
            <div className='flex items-center justify-between mb-4'>
                <p className="font-[#212121] font-[700] md:text-[25px] text-[18px] mb-3">Dashboard</p>
                <div className='flex items-center gap-3'>
                    <button className='border rounded-[10px] px-5 py-2 hover:bg-[#FF0200] hover:text-white'>Create Blog Post</button>
                    <button className='border rounded-[10px] px-5 py-2 hover:bg-[#FF0200] hover:text-white' onClick={() => router.push('/post-job')} >Post A Job</button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-5'>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <LuHouse className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Posts:</span> 123</p>
              </div>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <PiMoneyWavyLight className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Properties Sold:</span> 123</p>
              </div>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <LuHouse className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Properties:</span> 123</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}