"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../../components/nav-bar/Navbar'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';
import { BiUser } from 'react-icons/bi'
import Footer from '../../components/footer/Footer'
import { get } from '../../utils/axiosHelpers';
import { useParams, useRouter } from 'next/navigation';

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
    const router = useRouter();
    const { job } = useParams()

    const getAllJobs = async () => {
        try {
            setIsLoading(true);
            const response = await get(`/job-posts/${job}/`);
            
            // Check the structure of your response
            // If the API returns data directly, use response
            // If it returns with a 'data' property, use response.data
            const jobsData = response.results || response;

            console.log({response, jobsData});
            
            
            setJobs(jobsData);
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
        return <div>Loading job...</div>
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
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Job</span></p>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}