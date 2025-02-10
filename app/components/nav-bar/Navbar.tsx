import Link from 'next/link'
import React from 'react'
import { MdMail } from 'react-icons/md'
import logo from '../../../public/images/Get-a-school.png'
import Image from 'next/image'

export default function Navbar() {

    const navLinks = [
        {
            label: "Blog",
            link: "/",
        },
        {
            label: "Post Job",
            link: "/",
        },
        // {
        //     label: "Sell",
        //     link: "/",
        // },
        // {
        //     label: "Short Let",
        //     link: "/",
        // },
        // {
        //     label: "Find an Agent",
        //     link: "/find-an-agent",
        // },
    ]

  return (
    <div className='flex items-center justify-between max-w-[1600px] mx-auto px-[4rem] py-4'>
        <div className='flex items-center gap-8'>
            <Link className='text-primary-color font-[700] mr-5' href="/">
                <Image src={logo} width="40" height="40" alt='Logo' />
            </Link>
            <ul className='flex items-center gap-8'>
                {
                    navLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.link}>{link.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className='flex items-center gap-5'>
            {/* <MdMail /> */}
            {/* <Link href="">Advertise</Link> */}
            <Link className='bg-[#FF0200] rounded-[4px] px-[10px] py-[2px] text-white' href="/sign-in">Sign In</Link>
        </div>
    </div>
  )
}
