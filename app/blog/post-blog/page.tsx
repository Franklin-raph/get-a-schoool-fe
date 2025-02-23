"use client"

import React, { useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import Footer from '../../components/footer/Footer'

import 'react-quill-new/dist/quill.snow.css';
import { formats, modules } from "../../utils/quillEditorConfig"

import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
      <div className="h-[450px] bg-stone-100/80 animate-pulse rounded-md" />
    ),
});


export default function Page() {

    const [blog_content, setBlogContent] = useState<string>('') 

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
        <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
            <div className='mt-6'>
                <p className='text-[#344054]'>Blog Title</p>
                <input type="text" placeholder='Enter a title for your blog post here' className='outline-none block border border-[#C2C5E1] h-[48px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-5'>
                <p className='text-[#344054] mb-1'>Blog Description</p>
                <ReactQuill theme="snow" className='react-quill' value={blog_content} onChange={e => setBlogContent(e)} formats={formats} modules={modules} />
            </div>
            <button className='bg-[#FF0200] w-full py-[10px] rounded-[5px] text-white mt-3'>Save Blog</button>
        </div>
        <Footer />
    </div>
  )
}
