"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import BlogComponent from '../components/blog-component/BlogComponent'
import { MdAlarm } from 'react-icons/md'
import { BiDislike, BiLike } from 'react-icons/bi'
import Footer from '../components/footer/Footer'
import { TfiCommentAlt } from 'react-icons/tfi';
import { useRouter } from 'next/navigation';
import { get } from '../utils/axiosHelpers'

// interface BlogPost {
//     image: string;
//     title: string;
//     description: string;
//     author: string;
//     date: string;
// }

export default function Page() {

    const router = useRouter()
    // const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await get('/blog-posts/');
            
            // Check the structure of your response
            // If the API returns data directly, use response
            // If it returns with a 'data' property, use response.data
            const blogsData = response.results || response;

            console.log({response, blogsData});
            
            // setBlogs(blogsData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch blogs');
            setIsLoading(false);
            console.error(err);
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, [])


    // Render loading state
    if (isLoading) {
        return <div className='ww-[100vw] h-[100vh] flex items-center justify-center'>Loading blogs...</div>
    }

    // Render error state
    if (error) {
        return <div className='ww-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
    }
    

  return (
    <div>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem] flex items-center justify-between'>
                <div>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Blogs</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Blog</span></p>
                </div>
                {/* <button className='border py-[6px] px-3 rounded-[4px] border-gray-400 text-gray-500 hover:bg-gray-200 md:text-[15px] text-[12px]' onClick={() => router.push('/blog/post-blog')}>Post Blog</button> */}
            </div>
        </div>
        <div className='pt-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
            <div className='flex justify-center md:gap-[5rem] gap-[2rem] flex-col md:flex-row'>
                <div className='md:w-[700px]'>
                    <div className='flex items-center gap-3 mb-3 text-gray-700'>
                        <MdAlarm />
                        <p>12 Jun, 2022</p>
                    </div>
                    <p className='md:text-[22px] text-[18px] font-[600] mb-2'>Lorem ipsum dolor sit amet consectetur.</p>
                    <p className='md:text-[17px] text-[14px] text-gray-700'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, cumque. Aperiam totam consequatur libero ut ipsa quibusdam ea praesentium, vel doloremque modi sint eum expedita laudantium suscipit deleniti tempore odit impedit? Soluta, eos nobis recusandae dolores ipsa dolor molestiae molestias.
                    </p>
                    <div className='flex items-center gap-6 text-gray-700 mt-5 md:text-[15px] text-[13px]'>
                        <div className='flex items-center gap-1'>
                            <TfiCommentAlt className='cursor-pointer'/>
                            <p>2,213</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <BiLike className='cursor-pointer'/>
                            <p>10</p>
                        </div>
                        <div className='flex items-center gap-1'>
                            <BiDislike className='cursor-pointer'/>
                            <p>10</p>
                        </div>
                    </div>
                    <button onClick={() => router.push('/blog/12')} className='border py-[7px] px-[18px] mt-5 rounded-[4px] text-[14px]'>Read More</button>
                </div>
                <img src="./images/Study-Office-Administration.jpg" className='md:w-[400px] h-[400px] object-cover rounded-[10px]' alt="" />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[4rem] border-t pt-[4rem]'>
                <BlogComponent  />
            </div>
        </div>
        <Footer />
    </div>
  )
}
