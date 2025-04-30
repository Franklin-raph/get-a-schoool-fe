"use client"

import React from 'react'
import Navbar from '../components/nav-bar/Navbar'
import Footer from '../components/footer/Footer'

export default function Page() {

    return (
        <div>
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Services</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>our-services</span></p>
                </div>
            </div>
            <div className='py-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[0.8rem] grid md:grid-cols-2 gap-5'>
                <div className='border p-5 rounded-[10px]'>
                    <img src="./images/presentation.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                    <p className="text-[#FF0200] text-[22px] font-bold mb-1">Helping School Hire staff</p>
                    <p>
                        As a school owner, the cry of credible teachers ends today.
                        Get in contact with many teachers looking for jobs now
                    </p>
                </div>
                <div className='border p-5 rounded-[10px]'>
                    <img src="./images/female.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                    <p className="text-[#FF0200] text-[22px] font-bold mb-1">Helping Teachers Get hired.</p>
                    <p>
                        As a teacher, the pain of working for a bad employer ends today,
                        Get in contact with many schools looking for you now.
                    </p>
                </div>
                <div className='border p-5 rounded-[10px]'>
                    <img src="./images/seminar.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                    <p className="text-[#FF0200] text-[22px] font-bold mb-1">Symposium/Seminar for your staff</p>
                    <p>
                        We are open in helping your staff to be sharp mentally, psychologically, 
                        academically, and otherwise in order to give you their best.
                    </p>
                </div>
                <div className='border p-5 rounded-[10px]'>
                    <img src="./images/audit.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                    <p className="text-[#FF0200] text-[22px] font-bold mb-1">Terminal and Sessional Audit</p>
                    <p>
                        We help schools to audit their classes, pupils, students, and 
                        finance in order to fix any unforeseen loophole.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}