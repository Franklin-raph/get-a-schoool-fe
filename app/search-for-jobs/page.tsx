import React from 'react'
import Navbar from '../components/nav-bar/Navbar'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';
import { BiUser } from 'react-icons/bi'
import Footer from '../components/footer/Footer'


export default function Page() {
  return (
    <div>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Jobs</h1>
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Jobs</span></p>
            </div>
        </div>
        <div className='pb-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
            <div className='grid grid-cols-4 gap-5 mt-[5rem]'>
                {
                    [1,2,3,4,5].map(x => (
                        <div className='pb-4 h-[250px] cursor-pointer' key={x}>
                            <img src="./images/Study-Office-Administration.jpg" alt="" className='w-full h-[180px] object-cover'/>
                            <div className='pt-3'>
                            <div className='flex items-center justify-between'>
                                <p className='font-[500]'>Lorem ipsum dolor sit</p>
                                <p className='text-[12px] flex items-center gap-1 text-gray-500'> <BsClock /> {format("12-06-2021")}</p>
                            </div>
                            <p className='text-[12px] text-gray-500 flex items-center gap-1'> <BiUser /> Jhon Doe</p>
                            {/* <p className='text-[12px] text-gray-500 mt-3'>{blog.description}</p> */}
                            {/* <button className='border border-gray-500 text-[12px] text-gray-500 px-2 py-1 mt-3'>Read More</button> */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer />
    </div>
  )
}
