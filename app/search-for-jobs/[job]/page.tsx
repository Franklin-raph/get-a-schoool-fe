"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import Footer from '../../components/footer/Footer'
import { get } from '../../utils/axiosHelpers';
import { useParams } from 'next/navigation';
import { BiCopy } from 'react-icons/bi';
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

interface JobPost {
    id?: number;
    title?: string;
    description?: string | TrustedHTML;
    created_at: string;
    salary_lower_range?: number;
    salary_upper_range?: number;
    location?: string;
}

export default function Page() {
    const [jobs, setJobs] = useState<JobPost>({} as JobPost);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [shareOptions, setShareOptions] = useState<boolean>(false)
    const { job } = useParams();

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
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch job');
            setIsLoading(false);
            console.error(err);
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setAlertType('success');
        setMsg("Copied to clipboard");
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
                <div className="mt-4 flex items-center gap-[40px] md:gap-[30px] mb-6 border-t pt-3 relative">
                    <IoShareSocialOutline onClick={() => setShareOptions(!shareOptions)} className='text-[24px] cursor-pointer'/>
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
                        {/* <span className="text-sm">{copied ? 'Copied!' : 'Copy'}</span> */}
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    )
}