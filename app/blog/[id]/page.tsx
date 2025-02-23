"use client"

import React from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import { MdAlarm } from 'react-icons/md'
import { BiDislike, BiLike, BiUser } from 'react-icons/bi'
import Footer from '../../components/footer/Footer'
import { TfiCommentAlt } from 'react-icons/tfi';


export default function Page() {

  return (
    <div>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem] flex items-center justify-between'>
                <div>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Blogs</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Blog</span></p>
                </div>
                {/* <button className='border py-[6px] px-3 rounded-[4px] border-gray-400 text-gray-500 hover:bg-gray-200 md:text-[15px] text-[12px]'>Post Blog</button> */}
            </div>
        </div>
        <div className='pt-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
            <div className='flex justify-center md:gap-[1rem] gap-[2rem] flex-col'>
                <div className='w-full'>
                    <div className='flex items-center gap-3 mb-3 text-gray-700'>
                        <MdAlarm />
                        <p>12 Jun, 2022</p>
                    </div>
                    <p className='md:text-[22px] text-[18px] font-[600] mb-2'>Lorem ipsum dolor sit amet consectetur.</p>
                    <p className='md:text-[17px] text-[14px] text-gray-700'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, cumque. Aperiam totam consequatur libero ut ipsa quibusdam ea praesentium, vel doloremque modi sint eum expedita laudantium suscipit deleniti tempore odit impedit? Soluta, eos nobis recusandae dolores ipsa dolor molestiae molestias.
                    </p>
                    <img src="../images/Study-Office-Administration.jpg" className='h-[400px] mt-7 w-full object-cover rounded-[10px]' alt="" />
                </div>
                <div className='flex items-center gap-6 text-gray-700 mt-1'>
                    <div className='flex items-center gap-1 md:text-[15px] text-[13px]'>
                        <TfiCommentAlt className='cursor-pointer'/>
                        <p>22</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <BiLike className='cursor-pointer'/>
                        <p className='md:text-[15px] text-[13px]'>10</p>
                    </div>
                    <div className='flex items-center gap-1'>
                        <BiDislike className='cursor-pointer'/>
                        <p className='md:text-[15px] text-[13px]'>10</p>
                    </div>
                </div>
            </div>
            <div className='border-t pt-[2rem] mt-[4rem]'>
                <p className='font-[500] md:text-[18px]'>Comment Section</p>
                <textarea className='border outline-none w-full h-[80px] text-[14px] p-2 rounded-[5px] resize-none mt-2'></textarea>
                <button className='bg-[#FF0200] text-white text-[14px] py-[6px] px-3 rounded-[4px]'>Post Comment</button>

                <div className='mt-10'>
                    <p>Comments</p>
                    <div>
                        {
                            [1,1,1,1].map((comment, index) => (
                                <div key={index} className='flex items-start mt-7 border-b pb-2'>
                                    <div className='text-[17px] mr-2 p-[10px] rounded-full bg-gray-200 text-gray-500'>
                                        <BiUser />
                                    </div>
                                    <div className='text-[13px] md:text-[16px]'>
                                        <p>John Doe</p>
                                        <p>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, debitis.
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
