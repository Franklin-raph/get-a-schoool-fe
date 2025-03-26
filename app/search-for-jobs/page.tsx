"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';
import { BiUser } from 'react-icons/bi'
import Footer from '../components/footer/Footer'
import { get } from '../utils/axiosHelpers';

// Define a type for your job posts
interface JobPost {
    id?: number;
    title?: string;
    description?: string;
    created_at: string;
    user?: {
        full_name: string;
        // other properties of profile_pic if needed
      };
    // Add other properties as needed
}

export default function Page() {
    // Specify the type for jobs state
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllJobs = async () => {
        try {
            setIsLoading(true);
            const response = await get('/job-posts/');
            
            // Check the structure of your response
            // If the API returns data directly, use response
            // If it returns with a 'data' property, use response.data
            const jobsData = response.results || response;

            console.log({response, jobsData});
            
            
            setJobs(jobsData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch jobs');
            setIsLoading(false);
            console.error(err);
        }
    }

    useEffect(() => {
        getAllJobs();
    }, [])

    // Render loading state
    if (isLoading) {
        return <div>Loading jobs...</div>
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div>
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Jobs</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Jobs</span></p>
                </div>
            </div>
            <div className='pb-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
                <div className='grid grid-cols-4 gap-5 mt-[5rem]'>
                    {jobs.length > 0 ? (
                        jobs.map((job, index) => (
                            <div className='pb-4 h-[250px] cursor-pointer' key={job.id || index}>
                                <img src="./images/Study-Office-Administration.jpg" alt="" className='w-full h-[180px] object-cover'/>
                                <div className='pt-3'>
                                    <div className='flex items-center justify-between'>
                                        <p className='font-[500]'>{job.description}</p>
                                        <p className='text-[12px] flex items-center gap-1 text-gray-500'> 
                                            <BsClock /> {format(job.created_at)}
                                        </p>
                                    </div>
                                    <p className='text-[12px] text-gray-500 flex items-center gap-1'> 
                                        <BiUser /> {job?.user?.full_name}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No jobs found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}