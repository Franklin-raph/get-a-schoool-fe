"use client"

import Image from 'next/image';
import React from 'react'
import { IoIosSend } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import logo from '../../../public/images/Get-a-school.png'
import Link from 'next/link'
import { PiPhoneCall } from 'react-icons/pi';
import { FaFacebook } from 'react-icons/fa6';
import { BsInstagram, BsTiktok, BsTwitterX } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';

export default function Footer() {

  const handleSubmit = () => {
    // Handle newsletter submission
  };

  const contactMethods = [
    {
      title: 'Call',
      number: '+23489031317411',
      icon: <PiPhoneCall size="20px"/>,
      btnText: 'Call Now',
      link: 'tel:+23489031317411'
    },
    {
      title: 'Message',
      number: 'info@getaschool.com',
      icon: <CgMail size="21px"/>,
      btnText: 'Send Message',
      link: 'mailto:info@getaschool.com'
    },
    {
      title: 'Twitter',
      number: '',
      icon: <BsTwitterX />,
      btnText: 'Send Message',
      link: 'https://x.com/GetASchoolcom?t=L5CCpb4NIyiY4eGkwHth4A&s=09'
    },
    {
      title: 'Facebook',
      number: '',
      icon: <FaFacebook />,
      btnText: 'Send Message',
      link: 'https://www.facebook.com/share/1J9u54K1Yq/?mibextid=qi2Omg'
    },
    {
      title: 'Instagram',
      number: '',
      icon: <BsInstagram />,
      btnText: 'Send Message',
      link: 'https://www.instagram.com/getaschool?igsh=YTNnaXZpb3NtMG1p'
    },
    {
      title: 'Tiktok',
      number: '',
      icon: <BsTiktok />,
      btnText: 'Send Message',
      link: 'https://www.tiktok.com/@getaschool.com?_t=ZM-8wEEK5uPEKF&_r=1'
    }
  ];

  return (
    <footer className="text-[#777575] mt-[8rem] border-t pt-5">
      <div className="lg:max-w-[2000px] w-[95%] mx-auto md:px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Logo and Vision Section */}
          <div className="flex flex-col gap-2 lg:w-[600px]">
            <div className="flex items-center gap-1">
              <Image src={logo} width="40" height="40" alt='Logo' />
            </div>
            <p className="text-[#777575] text-[13px]">
              Welcome to the GetASchool.
              This is a general forum for connecting all users. Questions, discussions, and posts relevant to jobs are accommodated in this forum from both employers and employees. To start a discussion or post a question about a job or related discussions, use the &quot;Start Conversation&quot; button. <br />
              We strive to give you the best as you are our ultimate priority.
            </p>
          </div>

          <div className="flex w-full justify-between flex-col md:flex-row gap-[1rem] ml-0">
            {/* Newsletter Section */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[#777575] text-[13px]">Subscribe for our weekly news letter</h2>
              <form className="flex text-[13px]">
                <input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  className="px-4 py-2 rounded-l bg-white text-black sm:w-[20rem] w-full border focus:outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="bg-[#FF0200] text-white px-4 py-2 rounded-r flex items-center gap-2 hover:bg-[#df3939] transition-colors"
                >
                  Submit
                  <IoIosSend />
                </button>
              </form>
            </div>

            {/* Location and Navigation */}
            <div className="flex flex-col sm:items-center gap-2 md:w-[300px]">
              <div className="flex flex-col sm:items-end items-center gap-2 text-[#777575]">
                <IoLocationOutline className="text-[20px]" />
                <p className=" text-[13px] md:text-right">7 Oguejiofor Aniakor Street, Nkwelle GRA, Anambra State, Nigeria</p>
              </div>
              <nav>
                <ul className="flex gap-6 text-[#777575] text-[13px] mt-3">
                  {
                    contactMethods.map(contact => (
                      <li>
                        <Link className='text-[16px] hover:text-[#df3939]' target='_blank' href={contact.link}>{contact.icon}</Link>
                      </li>
                    ))
                  }
                  {/* <li><a href="#" className="hover:text-[#121212] transition-colors">Buy</a></li>
                  <li><a href="#" className="hover:text-[#121212] transition-colors">Sell</a></li>
                  <li><a href="#" className="hover:text-[#121212] transition-colors">Find an agent</a></li> */}
                </ul>
              </nav>
            </div>
          </div>

        </div>
      </div>
      <div className="bg-[#121212] text-white py-5 text-center text-[14px] mt-5">
        <div className="mb-5">
          <Link href="/privacy-policy" className="text-sm text-[#777575]">Privacy Policy</Link>
          <span className="mx-2">|</span>
          <Link href="/terms-and-conditions" className="text-sm text-[#777575]">Terms and Conditions</Link>
        </div>
        <p>&copy; All Right Reserved GetASchool {new Date().getFullYear()} </p>
      </div>
    </footer>
  )
}
