"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import { BsClock } from 'react-icons/bs'
import { format } from 'timeago.js';
import { BiFilter, BiUser } from 'react-icons/bi'
import Footer from '../components/footer/Footer'
import { get } from '../utils/axiosHelpers';
import { useRouter } from 'next/navigation';

// Define a type for your job posts
interface JobPost {
    id?: number;
    title?: string;
    description?: string;
    location?: string;
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
    const [filteredJobs, setFilteredJobs] = useState<JobPost[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [dropDown, setDropDown] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [salaryFilters, setSalaryFilters] = useState({
        low: '',
        high: ''
    });
    const [isApplyingFilter, setIsApplyingFilter] = useState(false);
    const router = useRouter();

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
            setFilteredJobs(jobsData);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch jobs');
            setIsLoading(false);
            console.error(err);
        }
    }

    // Frontend search filter implementation
    const handleSearchFilter = (query: string) => {
        setSearchQuery(query);
        
        if (!query.trim()) {
            setFilteredJobs(jobs);
            return;
        }

        const filtered = jobs.filter(job => {
            const searchTerm = query.toLowerCase();
            
            // Search in title
            const titleMatch = job.title?.toLowerCase().includes(searchTerm);
            
            // Search in description
            const descriptionMatch = job.description?.toLowerCase().includes(searchTerm);
            
            // Search in location (if available)
            const locationMatch = job.location?.toLowerCase().includes(searchTerm);
            
            return titleMatch || descriptionMatch || locationMatch;
        });

        setFilteredJobs(filtered);
    };

    // Salary filter implementation
    const handleSalaryFilter = async () => {
        if (!salaryFilters.low && !salaryFilters.high) {
            alert('Please enter at least one salary range value');
            return;
        }

        try {
            setIsApplyingFilter(true);
            
            // Build query parameters
            const params = new URLSearchParams();
            if (salaryFilters.low) {
                params.append('salary_lower_range', salaryFilters.low);
            }
            if (salaryFilters.high) {
                params.append('salary_upper_range', salaryFilters.high);
            }

            const response = await get(`/job-posts/get_jobs_by_filter/?${params.toString()}`);
            const filteredJobsData = response.results || response;
            
            setJobs(filteredJobsData);
            setFilteredJobs(filteredJobsData);
            
            // Close dropdown after applying filter
            setDropDown('');
            
            // Clear search query when salary filter is applied
            setSearchQuery('');
            
        } catch (err) {
            setError('Failed to apply salary filter');
            console.error(err);
        } finally {
            setIsApplyingFilter(false);
        }
    };

    // Reset filters
    const resetFilters = () => {
        setSalaryFilters({ low: '', high: '' });
        setSearchQuery('');
        getAllJobs(); // Reload original jobs
    };

    useEffect(() => {
        getAllJobs();
    }, [])

    // Render loading state
    if (isLoading) {
        return <div className='ww-[100vw] h-[100vh] flex items-center justify-center'>Loading jobs...</div>
    }

    // Render error state
    if (error) {
        return <div className='ww-[100vw] h-[100vh] flex items-center justify-center'>Error: {error}</div>
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
            <div className='pb-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1rem] mt-[5rem]'>

                <div className='flex items-center justify-between w-full relative gap-3'>
                    <input 
                        type="text" 
                        placeholder='Search job using keyword' 
                        className='border py-1 px-2 rounded-[5px] md:w-[30%] sm:w-[60%] w-[80%]'
                        value={searchQuery}
                        onChange={(e) => handleSearchFilter(e.target.value)}
                    />
                    <div className='flex gap-3 items-center'>
                        {(searchQuery || salaryFilters.low || salaryFilters.high) && (
                            <button 
                                onClick={resetFilters}
                                className='text-[14px] text-[#FF0200] hover:underline'
                            >
                                Clear Filters
                            </button>
                        )}
                        <div className='relative'>
                            <div onClick={() => setDropDown(dropDown === 'filter' ? '' : 'filter' )} className='flex gap-1 items-center cursor-pointer'>
                                <p>Filters</p>
                                <BiFilter />
                            </div>
                                {
                                    dropDown === 'filter' && (
                                        <div className='absolute z-10 p-3 top-[30px] bg-[#fff] w-[250px] right-0 rounded-[4px] border border-[#C2C5E1] h-[220px] overflow-y-auto'>
                                            <div>
                                                <div>
                                                    <p>Low Salary</p>
                                                    <input 
                                                        type='number' 
                                                        placeholder="Enter Low Salary" 
                                                        className='rounded-[2px] border p-1 outline-none w-full'
                                                        value={salaryFilters.low}
                                                        onChange={(e) => setSalaryFilters(prev => ({ ...prev, low: e.target.value }))}
                                                    />
                                                </div>
                                                <div className='my-3'>
                                                    <p>High Salary</p>
                                                    <input 
                                                        type='number' 
                                                        placeholder="Enter High Salary" 
                                                        className='rounded-[2px] border p-1 outline-none w-full'
                                                        value={salaryFilters.high}
                                                        onChange={(e) => setSalaryFilters(prev => ({ ...prev, high: e.target.value }))}
                                                    />
                                                </div>
                                                <button 
                                                    onClick={handleSalaryFilter}
                                                    disabled={isApplyingFilter}
                                                    className={`mt-3 bg-[#FF0200] w-full text-center text-white rounded-[4px] px-3 py-[6px] text-[14px] ${
                                                        isApplyingFilter ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#e01e00]'
                                                    }`}
                                                >
                                                    {isApplyingFilter ? 'Applying...' : 'Apply Filter'}
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-[1.2rem]'>
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                            <div onClick={() => router.push(`/search-for-jobs/${job.id}`)} className='border border-gray rounded-[10px] pb-4 cursor-pointer' key={job.id || index}>
                                <img src="./images/jobimg.jpg" alt="" className='w-full h-[180px] object-cover rounded-t-[8px]'/>
                                <div className='px-3 pt-3'>
                                    <div className='flex items-center justify-between mb-4'>
                                        <p className='text-[12px] text-gray-500 flex items-center gap-1'> 
                                            <BiUser /> {job?.user?.full_name}
                                        </p>
                                        <p className='text-[12px] flex items-center gap-1 text-gray-500'> 
                                            <BsClock /> {format(job.created_at)}
                                        </p>
                                    </div>
                                    <p className='text-[14px]'> <span className='text-gray-500'>Position:</span> {job.title ? job.title : "Nill"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='col-span-full text-center py-8'>
                            <p className='text-gray-500'>
                                {searchQuery || salaryFilters.low || salaryFilters.high 
                                    ? 'No jobs found matching your criteria' 
                                    : 'No jobs found'
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}