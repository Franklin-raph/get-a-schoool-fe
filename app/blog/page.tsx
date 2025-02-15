import React from 'react'
import Navbar from '../components/nav-bar/Navbar'
import { MdAlarm } from 'react-icons/md'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';
import { BiUser } from 'react-icons/bi'
import Footer from '../components/footer/Footer'


export default function Page() {
  return (
    <div>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='py-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
                <h1 className='text-[#101750] text-[32px] font-bold'>Blogs</h1>
                <p>Home / <span className='text-[#FF0200]'>Blog</span></p>
            </div>
        </div>
        <div className='py-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
            <div className='flex justify-center gap-[5rem]'>
                <div className='w-[700px]'>
                    <div className='flex items-center gap-3 mb-3 text-gray-700'>
                        <MdAlarm />
                        <p>12 Jun, 2022</p>
                    </div>
                    <p className='text-[22px] font-[600] mb-2'>Lorem ipsum dolor sit amet consectetur.</p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, cumque. Aperiam totam consequatur libero ut ipsa quibusdam ea praesentium, vel doloremque modi sint eum expedita laudantium suscipit deleniti tempore odit impedit? Soluta, eos nobis recusandae dolores ipsa dolor molestiae molestias.
                    </p>
                    <button className='border py-[7px] px-[18px] mt-5 rounded-[4px]'>Read More</button>
                </div>
                <img src="./images/Study-Office-Administration.jpg" className='w-[400px] h-[400px] object-cover rounded-[10px]' alt="" />
            </div>
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
