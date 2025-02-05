import Link from 'next/link'
import React from 'react'
import { MdMail } from 'react-icons/md'

export default function Navbar() {

    const navLinks = [
        {
            label: "Buy",
            link: "/",
        },
        {
            label: "Rent",
            link: "/",
        },
        {
            label: "Sell",
            link: "/",
        },
        {
            label: "Short Let",
            link: "/",
        },
        {
            label: "Find an Agent",
            link: "/find-an-agent",
        },
    ]

  return (
    <div className='flex items-center justify-between max-w-[1600px] mx-auto px-[4rem] py-4'>
        <div className='flex items-center gap-8'>
            <Link className='text-primary-color font-[700] mr-6' href="/">
                <img src="./images/Get-a-school.png" alt="" className='w-[40px]'/>
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
            <MdMail />
            <Link href="">Advertise</Link>
            <Link className='bg-[#FF0200] rounded-[4px] px-[10px] py-[2px] text-white' href="/login">Sign In</Link>
        </div>
    </div>
  )
}
