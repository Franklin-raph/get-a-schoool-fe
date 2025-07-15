"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import BlogComponent from '../components/blog-component/BlogComponent'
import { MdAlarm } from 'react-icons/md'
import { BiLike } from 'react-icons/bi'
import Footer from '../components/footer/Footer'
import { TfiCommentAlt } from 'react-icons/tfi';
import { useRouter } from 'next/navigation';
import { get, post } from '../utils/axiosHelpers'
import { format } from 'timeago.js';
import Alert from '../components/alert/Alert'
import Cookies from 'js-cookie';

interface BlogPost {
    id: string;
    slug: string;
    image: string;
    title: string;
    description: string;
    content: string;
    comment_count: string;
    like_count: string;
    created_at: string;
    user : {
        full_name: string;
    },
    cover_image : {
        media: string;
    }
}

export default function Page() {

    const router = useRouter()
    // const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const token = Cookies.get('token');

  const getAllBlogs = async () => {
      try {
          setIsLoading(true);
          const response = await get('/blog-posts/');
          const blogsData = response.results || response;

          console.log({response, blogsData});
          
        //   setBlogs(blogsData);
          setBlog(blogsData[0]);
          setIsLoading(false);
      } catch (err) {
          setError('Failed to fetch blogs');
          setIsLoading(false);
          console.error(err);
      }
  }

  const getAllBlogsAfterLiking = async () => {
      try {
          const response = await get('/blog-posts/');
          
          const blogsData = response.results || response;

          console.log({response, blogsData});
          
        //   setBlogs(blogsData);
          setBlog(blogsData[0]);
      } catch (err) {
          setError('Failed to fetch blogs');
          console.error(err);
      }
  }


  const likeBlog = async (blogId: string) => {
    try {
      const response = await post(`/likes/`, {content_type:"blogpost", object_id: blogId});
      console.log('Blog liked:', response);
      // Optionally, you can update the state to reflect the new like count
    //   setBlogs(prevBlogs => 
    //     prevBlogs.map(blog => 
    //       blog.id === blogId ? { ...blog, like_count: (parseInt(blog.like_count) + 1).toString() } : blog
    //     )
    //   );
      getAllBlogsAfterLiking()
    }
    catch (error) {
        console.error('Error liking blog:', error);
        setMsg('Failed to like blog');
        setAlertType('error');
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, [])

    // Render empty state if no jobs
    // if (blogs.length === 0) {
    //     return <div>No blogs found</div>
    // }

    // Render loading state
    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Loading blogs...</div>
    }

    // Render error state
    if (error) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
    }
    

  return (
    <div>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
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
            {
                blog &&
                <div className='flex justify-center md:gap-[5rem] gap-[2rem] flex-col md:flex-row'>
                    <div className='md:w-[700px]'>
                        <div className='flex items-center gap-3 mb-3 text-gray-700'>
                            <MdAlarm />
                            <p>{blog?.created_at ? format(blog.created_at) : ''}</p>
                        </div>
                        <p className='md:text-[22px] text-[18px] font-[600] mb-2'>{blog?.title}</p>
                        <p className='md:text-[17px] text-[14px] text-gray-700'>
                            {blog?.content}
                        </p>
                        <div className='flex items-center gap-6 text-gray-700 mt-5 md:text-[15px] text-[13px]'>
                            <div className='flex items-center gap-1'>
                                <TfiCommentAlt className='cursor-pointer'/>
                                <p>{blog?.comment_count}</p>
                            </div>
                            {
                                token ?
                                <div className='flex items-center gap-1'>
                                    <BiLike onClick={() => blog?.id && likeBlog(blog.id)} className='cursor-pointer'/>
                                    <p>{blog?.like_count}</p>
                                </div>
                                :
                                <div className='flex items-center gap-1'>
                                    <BiLike className='cursor-pointer'/>
                                    <p>{blog?.like_count}</p>
                                </div>
                            }
                        </div>
                        <button onClick={() => blog?.slug && router.push(`/blog/${blog.slug}`)} className='border py-[7px] px-[18px] mt-5 rounded-[4px] text-[14px]'>Read More</button>
                    </div>
                    {
                        blog?.cover_image &&
                        <img src={blog?.cover_image?.media} className='md:w-[400px] h-[400px] object-cover rounded-[10px]' alt="" />
                    }
                </div>
            }

            <BlogComponent  />
        </div>
        <Footer />
    </div>
  )
}