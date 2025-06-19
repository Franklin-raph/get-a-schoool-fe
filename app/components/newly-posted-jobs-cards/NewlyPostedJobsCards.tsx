import { useRouter } from 'next/navigation';
import React from 'react';

interface NewlyPostedJobsCardProps {
  job: {
    id?: number;
    location?: string;
    description?: string;
    salary_lower_range?: number;
    salary_upper_range?: number;
    title?: string;
  };
}

export default function NewlyPostedJobsCards({ job }: NewlyPostedJobsCardProps) {

  const router = useRouter()

  return (
    <div>
      <div onClick={() => router.push(`/search-for-jobs/${job.id}`)} className="text-left px-7 border rounded-[15px] shadow py-6 cursor-pointer mx-1 h-[175px] overflow-y-scroll">
        {/* <img
          src={job.image}
          alt={job.jobTitle}
          className="w-[50px] h-[50px] rounded-full mr-auto object-cover"
        /> */}
        {/* <p className="mt-5 font-[500] text-[12px] md:text-[14px] lg:text-[16px]">Job Description: <span className='font-[400]'>{job.description}</span> </p> */}
        <div>
          <p className='text-gray-500 text-[14px]'>Position:</p>
          <p className='text-[14px] font-bold'> {job.title ? job.title : "Nill"}</p>
        </div>
        <div className='my-2'>
          <p className='text-gray-500 text-[14px]'>Salary Range:</p>
          <p className='text-[14px] font-bold'> ₦{job.salary_lower_range?.toLocaleString()} - ₦{job.salary_upper_range?.toLocaleString()}</p>
        </div>
        <div>
          <p className='text-gray-500 text-[14px]'>Location:</p>
          <p className='text-[14px] font-bold'> {job.location} </p>
        </div>
      </div>
    </div>
  );
}
