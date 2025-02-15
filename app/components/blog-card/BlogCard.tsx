import React from 'react'
import { BiUser } from 'react-icons/bi'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';


interface Blog {
    image: string;
    title: string;
    description: string;
    author: string;
    date: string;
  }
  
  interface BlogCardProps {
    blog: Blog;
  }

export default function BlogCard({blog}: BlogCardProps ) {
  return (
    <div className='border rounded-[10px] pb-4 h-[350px] overflow-y-scroll'>
        <img src={blog.image} alt="" className='w-full h-[180px] rounded-t-[10px] object-cover'/>
        <div className='px-3 pt-3'>
        <div className='flex items-center justify-between'>
            <p className='font-[500] md:text-[15px] text-[13px]'>{blog.title}</p>
            <p className='text-[12px] flex items-center gap-1 text-gray-500'> <BsClock /> {format(blog.date)}</p>
        </div>
        <p className='text-[12px] text-gray-500 flex items-center gap-1'> <BiUser /> {blog.author}</p>
        <p className='text-[12px] text-gray-500 mt-3'>{blog.description}</p>
        <button className='border border-gray-500 text-[12px] text-gray-500 px-2 py-1 mt-3'>Read More</button>
        </div>
    </div>
  )
}
