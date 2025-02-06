"use client"

import React from 'react'
import { IoIosSend } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'

export default function Footer() {

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle newsletter submission
  };

  return (
    <footer className="text-[#777575] mt-[8rem]">
      <div className="md:max-w-[2000px] w-[95%] mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Vision Section */}
          <div className="flex flex-col gap-2 w-[400px]">
            <div className="flex items-center gap-1">
              <img src="./images/Get-a-school.png" alt="" className='w-[60px]' />
            </div>
            <p className="text-[#777575] text-[13px]">
            Zillow9ja is Nigeria's trusted platform for buying, selling, and renting apartments. We connect people to their perfect homes with ease, offering a wide range of verified listings, simple search tools, and reliable support. Whether you're looking for a place to live or a buyer for your property, Zillow9ja makes the process smooth and stress-free.
            </p>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-2">
            <h2 className="text-[#777575] text-[13px]">Subscribe for our weekly news letter</h2>
            <form onSubmit={handleSubmit} className="flex text-[13px]">
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="px-4 py-2 rounded-l bg-white text-black w-[20rem] border focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#FF0200] text-white px-4 py-2 rounded-r flex items-center gap-2 hover:bg-[#154742] transition-colors"
              >
                Submit
                <IoIosSend />
              </button>
            </form>
          </div>

          {/* Location and Navigation */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex flex-col items-end gap-2 text-[#777575]">
              <IoLocationOutline className="text-[20px]" />
              <p className=" text-[13px]">145 New York, FL 5467, USA</p>
            </div>
            <nav>
              <ul className="flex gap-6 text-[#777575] text-[13px]">
                <li><a href="#" className="hover:text-[#121212] transition-colors">Buy</a></li>
                <li><a href="#" className="hover:text-[#121212] transition-colors">Sell</a></li>
                <li><a href="#" className="hover:text-[#121212] transition-colors">Find an agent</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-[#121212] text-white py-5 text-center text-[14px] mt-5">
        <div className="mb-5">
          <a href="#" className="text-sm text-[#777575]">Privacy Policy</a>
          <span className="mx-2">|</span>
          <a href="#" className="text-sm text-[#777575]">Terms and Conditions</a>
        </div>
        <p>&copy; All Right Reserved {new Date().getFullYear()} </p>
      </div>
    </footer>
  )
}
