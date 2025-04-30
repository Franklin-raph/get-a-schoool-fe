"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import Footer from '../components/footer/Footer'

export default function Page() {

    return (
        <div>
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Terms and Conditions</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>terms-and-conditions</span></p>
                </div>
            </div>
            <div className='pb-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[2rem]'>
                
            </div>
            <Footer />
        </div>
    )
}