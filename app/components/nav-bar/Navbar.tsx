"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../../public/images/Get-a-school.png'
import Image from 'next/image'
import { BiMenu } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'
import Cookies from 'js-cookie';

export default function Navbar() {

    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const token = Cookies.get('token')

    const navLinks = [
        {
            label: "Blog",
            link: "/blog",
        },
        {
            label: "About",
            link: "/about-us",
        },
        {
            label: "Services",
            link: "/our-services",
        },
        {
            label: "Post Job",
            link: "/post-job",
        },
        {
            label: "Search For Jobs",
            link: "/search-for-jobs",
        }
    ]

  return (
    <div className='flex items-center justify-between max-w-[1600px] mx-auto md:px-[4rem] px-[1rem] py-4'>
        <div className='flex items-center gap-8 justify-between sm:justify-normal w-full sm:w-[80%]'>
            <Link className='text-primary-color font-[700] mr-5' href="/">
                <Image src={logo} width="40" height="40" alt='Logo' />
            </Link>
            <ul className='hidden sm:flex items-center gap-8'>
                {
                    navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.link}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>

            {/* Mobile Nav */}
            {
                mobileNavOpen &&
                <div className='block sm:hidden fixed left-0 top-0 h-[100%] bg-black z-[999] text-white w-[45%]'>
                    <div className='fixed top-0 left-0 w-[100%] h-full bg-[#000000ab] z-[1]' onClick={() => setMobileNavOpen(false)}></div>
                    <div onClick={() => setMobileNavOpen(false)} className='text-white text-right fixed right-[16px] top-[25px] z-[2] border text-[20px] p-1 cursor-pointer'>
                        <IoCloseOutline className='cursor-pointer'/>
                    </div>
                    <ul className='fixed flex flex-col items-start pt-[6rem] w-[70%] h-full bg-black z-[999]'>
                        {
                            navLinks.map((link, index) => (
                                <li key={index} className='w-full'>
                                    <Link href={link.link} className='pl-[1rem] hover:bg-[#FF0200] transition-all w-full block py-4'>{link.label}</Link>
                                </li>
                            ))
                        }
                    <Link className='hover:bg-[#FF0200] transition-all ml-[1rem] mt-3 border py-[10px] px-7 text-white' href="/sign-in">Sign In..</Link>
                    </ul>
                </div>
            }
            <div onClick={() => setMobileNavOpen(true)} className='text-gray-400 text-right border border-gray-400 text-[20px] block cursor-pointer sm:hidden bg-white p-1'>
                <BiMenu className=''/>
            </div>
        </div>
        <div className='flex items-center gap-5'>
            {/* <MdMail /> */}
            {/* <Link href="">Advertise</Link> */}
            {
                token ?
                <Link className='bg-[#FF0200] rounded-[4px] px-[16px] py-[5px] text-white hidden sm:block' href="/my-profile">My Profile</Link>
                :
                <Link className='bg-[#FF0200] rounded-[4px] px-[16px] py-[5px] text-white hidden sm:block' href="/sign-in">Sign In.</Link>
            }
        </div>
    </div>
  )
}
