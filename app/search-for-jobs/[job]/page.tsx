"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import Footer from '../../components/footer/Footer'
import { get, post } from '../../utils/axiosHelpers';
import { useParams } from 'next/navigation';
import { BiComment, BiCopy, BiLike } from 'react-icons/bi';
import { 
  FacebookShareButton, 
  TwitterShareButton, 
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon
} from 'react-share';
import { IoShareSocialOutline } from 'react-icons/io5';
import Alert from '@/app/components/alert/Alert';
import Cookies from 'js-cookie';
import BtnLoader from '@/app/components/btnLoader/BtnLoader';
import { TbRosetteDiscountCheckFilled } from 'react-icons/tb';

interface JobPost {
    id?: number;
    title?: string;
    description?: string | TrustedHTML;
    created_at: string;
    salary_lower_range?: number;
    salary_upper_range?: number;
    like_count?: number;
    comment_count?: number;
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
    ];
    location?: string;
}

export default function Page() {
    const [jobs, setJobs] = useState<JobPost>({} as JobPost);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [shareOptions, setShareOptions] = useState<boolean>(false)
    // setContent
    const { job } = useParams();
    const token = Cookies.get('token');

    // Get current URL
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const title = jobs?.title || 'Job Posting';
    const salaryRange = jobs?.salary_lower_range && jobs?.salary_upper_range 
        ? `₦${jobs.salary_lower_range.toLocaleString()} - ₦${jobs.salary_upper_range.toLocaleString()}`
        : 'Competitive Salary';

    const getJob = async () => {
        try {
            setIsLoading(true);
            const response = await get(`/job-posts/${job}/`);
            const jobData = response.results || response;
            setJobs(jobData);
            console.log('Job data:', jobData);
            
        } catch (err) {
            setError('Failed to fetch job');
            console.error(err);
        }finally{
            setIsLoading(false);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setAlertType('success');
        setMsg("Copied to clipboard");
    }

    const getJobAfterLikingOrCommenting = async () => {
        try {
            const response = await get(`/job-posts/${job}/`);
            const jobData = response.results || response;
            console.log('Job data after liking:', jobData);
            setJobs(jobData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch job');
            setIsLoading(false);
            console.error(err);
        }
    }

    const likeJob = async () => {
        try {
            const response = await post(`/likes/`, {content_type:"jobpost", object_id: job});
            console.log('Job liked:', response);
            // Optionally, you can update the state to reflect the new like count
        //   setBlogs(prevBlogs => 
        //     prevBlogs.map(blog => 
        //       blog.id === blogId ? { ...blog, like_count: (parseInt(blog.like_count) + 1).toString() } : blog
        //     )
        //   );
            getJobAfterLikingOrCommenting()
        }
        catch (error) {
            console.error('Error liking blog:', error);
            setMsg('Failed to like blog');
            setAlertType('error');
        }
    }

    const commentOnJob = async () => {
        if(!content){
            setMsg('Please enter a comment');
            setAlertType('error');
            return
        }
        try {
            setLoading(true)
            const response = await post(`/comments/`, {content_type:"jobpost", object_id: jobs?.id, content});
            console.log('Blog liked:', response);
            setContent('')
            // Optionally, you can update the state to reflect the new like count
            getJobAfterLikingOrCommenting()
        }
        catch (error) {
            console.error('Error liking blog:', error);
            setMsg('Failed to like blog');
            setAlertType('error');
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getJob();
    }, [])

    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Loading job...</div>
    }

    if (error) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
    }

    return (
        <div>
            {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Jobs</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Job</span></p>
                </div>
            </div>
            <div className='max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem] py-[2rem]'>
                <div>
                    <p className='text-gray-500 text-[14px]'>Position:</p>
                    <p className='text-[14px] font-bold'> {jobs?.title ? jobs?.title : "Nill"}</p>
                </div>
                <div className='my-2'>
                    <p className='text-gray-500 text-[14px]'>Salary Range:</p>
                    <p className='text-[14px] font-bold'> ₦{jobs?.salary_lower_range?.toLocaleString()} - ₦{jobs?.salary_upper_range?.toLocaleString()}</p>
                </div>
                <div>
                    <p className='text-gray-500 text-[14px]'>Location:</p>
                    <p className='text-[14px] font-bold'> {jobs?.location} </p>
                </div>
                
                
                <div className='mt-4'>
                    <p className='text-gray-500 text-[14px]'>Description:</p>
                    <div 
                        className='text-[14px] styleElements unreset' 
                        dangerouslySetInnerHTML={{ __html: (jobs?.description as string) }}
                    />
                </div>
                {/* Share Buttons Section */}
                <div className="mt-4 flex items-center gap-[35px] md:gap-[25px] mb-6 border-t pt-3 relative">
                    <IoShareSocialOutline onClick={() => setShareOptions(!shareOptions)} className='text-[24px] cursor-pointer hover:text-gray-400'/>
                    {
                        shareOptions &&
                        <div className="absolute left-0 top-[40px] flex items-center gap-[22px] bg-gray-200 p-2">
                            <FacebookShareButton 
                                url={shareUrl}
                                hashtag="#JobOpportunity"  // Optional hashtag
                                className="hover:opacity-80 transition-opacity"
                            >
                                <FacebookIcon size={26} round />
                            </FacebookShareButton>
                            
                            <TwitterShareButton 
                                url={shareUrl}
                                title={`Check out this job: ${title} - ${salaryRange}`}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <TwitterIcon size={26} round />
                            </TwitterShareButton>
                            
                            <WhatsappShareButton 
                                url={shareUrl}
                                title={`Check out this job: ${title} - ${salaryRange} at ${jobs?.location}`}
                                className="hover:opacity-80 transition-opacity"
                            >
                                <WhatsappIcon size={26} round />
                            </WhatsappShareButton>  
                    </div>
                    }
                    <button 
                        onClick={copyToClipboard}
                        className="hover:text-gray-400 text-[20px]"
                    >
                        <BiCopy />
                    </button>
                    {
                        token &&
                        <>
                            <div className='flex items-center gap-[6px]'>
                                <BiLike onClick={likeJob} className="hover:text-gray-400 text-[20px] cursor-pointer"/>
                                <p className='text-gray-500'>{jobs?.like_count}</p>
                            </div>
                            <div className='flex items-center gap-[6px]'>
                                <BiComment className="hover:text-gray-400 text-[20px] cursor-pointer"/>
                                <p className='text-gray-500'>{jobs?.comment_count}</p>
                            </div>
                        </>
                    }
                    {
                        !token &&
                        <>
                            <div className='flex items-center gap-[6px]'>
                                <BiLike className="hover:text-gray-400 text-[20px] cursor-pointer"/>
                                <p className='text-gray-500'>{jobs?.like_count}</p>
                            </div>
                            <div className='flex items-center gap-[6px]'>
                                <BiComment className="hover:text-gray-400 text-[20px] cursor-pointer"/>
                                <p className='text-gray-500'>{jobs?.comment_count}</p>
                            </div>
                        </>
                    }
                </div>
                <div className='pt-[2rem] mt-[2rem]'>
                <p className='font-[500] md:text-[18px]'>Comment Section</p>
                {
                    token &&
                    <>
                        <textarea value={content} onChange={e => setContent(e.target.value)} className='border outline-none w-full h-[80px] text-[14px] p-2 rounded-[5px] resize-none mt-2'></textarea>
                        {
                            loading ?
                            <BtnLoader />
                            :
                            <button onClick={commentOnJob} className='bg-[#FF0200] text-white text-[14px] py-[6px] px-3 rounded-[4px]'>Post Comment</button>
                        }
                    </>
                }
                    <div className='mt-10'>
                        <p>Comments</p>
                        {
                            (!jobs?.comments?.length) && 
                            <p className='text-gray-500 mt-2'>No comments yet. Be the first to comment!</p>
                        }
                        <div>
                            {
                                jobs?.comments.slice().reverse().map((comment, index) => (
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