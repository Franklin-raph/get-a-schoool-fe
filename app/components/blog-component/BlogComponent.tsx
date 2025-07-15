import { get } from '@/app/utils/axiosHelpers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';


interface BlogPost {
    id:string;
    slug:string;
    image: string;
    title: string;
    description: string;
    content: string;
    author: string;
    created_at: string;
    user : {
        full_name: string;
    }
}

export default function BlogCard() {

  const router = useRouter()
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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
          
          setBlogs(blogsData);
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
        return <div className='text-center'>Loading blogs...</div>
    }

    // Render error state
    if (error) {
        return <div className='text-center'>Error: {error}</div>
    }

    // Render empty state if no jobs
    if (blogs.length === 0) {
        return <div className='text-center' >No blogs found</div>
    }

  return (
    <div className='grid md:grid-cols-4 grid-cols-2 md:gap-2 gap-4 md:w-[85%] w-[95%] mx-auto mt-8'>
        {
          blogs?.map((blog, index) => (
            <div key={index} className='border rounded-[10px] pb-4 h-[350px] overflow-y-scroll'>
                <img src={blog.image} alt="" className='w-full h-[180px] rounded-t-[10px] object-cover'/>
                <div className='px-3 pt-3'>
                  <div className='flex sm:items-center justify-between flex-col sm:flex-row items-start'>
                      <p className='font-[500] text-[14px] mb-2'>{blog.title}</p>
                      <p className='text-[12px] flex items-center gap-1 text-gray-500'> <BsClock className='text-[12px]'/> {format(blog.created_at)}</p>
                  </div>
                  <p className='text-[12px] text-gray-500 flex items-center gap-1'> <BiUser /> {blog.user.full_name}</p>
                  <p className='text-[12px] text-gray-500 mt-3'>{blog.content}</p>
                  <button className='border border-gray-500 text-[12px] text-gray-500 px-2 py-1 mt-3' onClick={() => router.push(`/blog/${blog.slug}`)}>Read More</button>
                </div>
            </div>
          )).slice(0, 4)
        }
    </div>
  )
}
