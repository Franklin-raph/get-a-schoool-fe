"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import Footer from '../../components/footer/Footer'
import { get } from '../../utils/axiosHelpers';
import { useParams } from 'next/navigation';

// Define a type for your job posts
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
    // Specify the type for jobs state
    const [jobs, setJobs] = useState<JobPost>({} as JobPost);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { job } = useParams();

    const getAllJobs = async () => {
        try {
            setIsLoading(true);
            const response = await get(`/job-posts/${job}/`);
            
            const jobData = response.results || response;

            console.log({response, jobData});
            
            setJobs(jobData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch job');
            setIsLoading(false);
            console.error(err);
        }
    }

    useEffect(() => {
        getAllJobs();
    }, [])

    // Render loading state
    if (isLoading) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Loading job...</div>
    }

    // Render error state
    if (error) {
        return <div className='w-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
    }

    return (
        <div>
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
            </div>
            <Footer />
        </div>
    )
}