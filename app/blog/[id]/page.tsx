"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import { MdAlarm } from 'react-icons/md'
import { BiLike } from 'react-icons/bi'
import Footer from '../../components/footer/Footer'
import { TfiCommentAlt } from 'react-icons/tfi';
import { useParams } from 'next/navigation';
import { get, post } from '../../utils/axiosHelpers'
import { format } from 'timeago.js';
import Alert from '@/app/components/alert/Alert'
import BtnLoader from '@/app/components/btnLoader/BtnLoader'
import Cookies from 'js-cookie';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb'

interface BlogPost {
    id: string;
    image: string;
    title: string;
    description: string;
    content: string;
    comment_count: string;
    like_count: string;
    created_at: string;
    user : {
        full_name: string;
    }
    comments: [
        {
            id: string;
            content: string;
            created_at: string;
            user: {
                full_name: string;
                is_verified?: boolean;
            }
        }
    ]
}


export default function Page() {

    const { id } = useParams()

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const token = Cookies.get('token');

    const getAllBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await get(`/blog-posts/${id}/`);
            
            // Check the structure of your response
            // If the API returns data directly, use response
            // If it returns with a 'data' property, use response.data
            const blogData = response.results || response;

            console.log({response, blogData});
            
            setBlog(blogData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch blog');
            setIsLoading(false);
            console.error(err);
        }
    }

    const getAllBlogsAfterCommenting = async () => {
        try {
            const response = await get(`/blog-posts/${id}/`);
            
            // Check the structure of your response
            // If the API returns data directly, use response
            // If it returns with a 'data' property, use response.data
            const blogData = response.results || response;

            console.log({response, blogData});
            
            setBlog(blogData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch blog');
            setIsLoading(false);
            console.error(err);
        }
    }

    useEffect(() => {
        getAllBlogs();
    }, [])

    // Render loading state
    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Loading blog...</div>
    }

    // Render error state
    if (error) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
    }

    const commentOnBlog = async () => {
        if(!content){
            setMsg('Please enter a comment');
            setAlertType('error');
            return
        }
        try {
            setLoading(true)
            const response = await post(`/comments/`, {content_type:"blogpost", object_id: blog?.id, content});
            console.log('Blog liked:', response);
            setContent('')
            // Optionally, you can update the state to reflect the new like count
            getAllBlogsAfterCommenting()
        }
        catch (error) {
            console.error('Error liking blog:', error);
            setMsg('Failed to like blog');
            setAlertType('error');
        }finally{
            setLoading(false)
        }
    }

    const likeBlog = async (blogId: string) => {
        try {
            const response = await post(`/likes/`, {content_type:"blogpost", object_id: blogId});
            console.log('Blog liked:', response);
            // Optionally, you can update the state to reflect the new like count
            // setBlogs(prevBlogs => 
            //     prevBlogs.map(blog => 
            //         blog.id === blogId ? { ...blog, like_count: (parseInt(blog.like_count) + 1).toString() } : blog
            //     )
            // );

            getAllBlogsAfterCommenting()
        }
        catch (error) {
            console.error('Error liking blog:', error);
            setMsg('Failed to like blog');
            setAlertType('error');
        }
    }


  return (
    <div>
        <Navbar />
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem] flex items-center justify-between'>
                <div>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Blogs</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Blog</span></p>
                </div>
                {/* <button className='border py-[6px] px-3 rounded-[4px] border-gray-400 text-gray-500 hover:bg-gray-200 md:text-[15px] text-[12px]'>Post Blog</button> */}
            </div>
        </div>
        <div className='pt-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
            <div className='flex justify-center md:gap-[1rem] gap-[2rem] flex-col'>
                <div className='w-full'>
                    <div className='flex items-center gap-3 mb-3 text-gray-700'>
                        <MdAlarm />
                        <p>{blog?.created_at ? format(blog.created_at) : ''}</p>
                    </div>
                    <p className='md:text-[22px] text-[18px] font-[600] mb-2'>{blog?.title}</p>
                    <p dangerouslySetInnerHTML={{ __html: (blog?.content as string) }} className='md:text-[17px] text-[14px] text-gray-700' />
                    {/* <p className='md:text-[17px] text-[14px] text-gray-700'>
                        {blog?.content}
                    </p> */}
                    {/* <img src="../images/Study-Office-Administration.jpg" className='h-[400px] mt-7 w-full object-cover rounded-[10px]' alt="" /> */}
                </div>
                <div className='flex items-center gap-6 text-gray-700 mt-1'>
                    <div className='flex items-center gap-1 md:text-[15px] text-[13px]'>
                        <TfiCommentAlt className='cursor-pointer'/>
                        <p>{blog?.comment_count}</p>
                    </div>
                    {
                        token ?
                        <div className='flex items-center gap-1'>
                            <BiLike onClick={() => blog?.id && likeBlog(blog?.id)} className='cursor-pointer'/>
                            <p className='md:text-[15px] text-[13px]'>{blog?.like_count}</p>
                        </div>
                        :
                        <div className='flex items-center gap-1'>
                            <BiLike className='cursor-pointer'/>
                            <p className='md:text-[15px] text-[13px]'>{blog?.like_count}</p>
                        </div>
                    }
                </div>
            </div>
            <div className='border-t pt-[2rem] mt-[4rem]'>
                <p className='font-[500] md:text-[18px]'>Comment Section</p>
                {
                    token &&
                    <>
                        <textarea value={content} onChange={e => setContent(e.target.value)} className='border outline-none w-full h-[80px] text-[14px] p-2 rounded-[5px] resize-none mt-2'></textarea>
                        {
                            loading ?
                            <BtnLoader />
                            :
                            <button onClick={commentOnBlog} className='bg-[#FF0200] text-white text-[14px] py-[6px] px-3 rounded-[4px]'>Post Comment</button>
                        }
                    </>
                }

                <div className='mt-10'>
                    <p>Comments</p>
                    {
                        (!blog?.comments?.length) && 
                        <p className='text-gray-500 mt-2'>No comments yet. Be the first to comment!</p>
                    }
                    <div>
                        {
                            blog?.comments.slice().reverse().map((comment, index) => (
                                <div key={index} className='flex items-start mt-7 border-b pb-2'>
                                    <div className='text-[13px] md:text-[16px]'>
                                        <p className='text-[16px]'>
                                            {comment.content}
                                        </p>
                                        <div className='flex items-center gap-2 mt-1'>
                                            <p className='mt-1 font-[500] text-[12px] text-gray-600'>Comment by: {comment.user.full_name}</p>
                                            {
                                                comment?.user?.is_verified &&
                                                <TbRosetteDiscountCheckFilled className='text-[#2D8B57]'/>
                                            }
                                        </div>
                                        {/* <p className='mt-1 font-[500] text-[12px] text-gray-600'>Comment by: {comment.user.full_name}</p> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}