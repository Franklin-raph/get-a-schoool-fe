import React from 'react';

interface NewlyPostedJobsCardProps {
  job: {
    id?: number;
    location?: string;
    description?: string;
    salary_lower_range?: number;
    salary_upper_range?: number;
  };
}

export default function NewlyPostedJobsCards({ job }: NewlyPostedJobsCardProps) {
  return (
    <div>
      <div className="text-left px-7 border rounded-[15px] shadow py-6 cursor-pointer mx-1 h-[175px]">
        {/* <img
          src={job.image}
          alt={job.jobTitle}
          className="w-[50px] h-[50px] rounded-full mr-auto object-cover"
        /> */}
        <p className="mt-5 font-[500] text-[12px] md:text-[14px] lg:text-[16px]">Job Description: <span className='font-[400]'>{job.description}</span> </p>
        <p className="mt-1 font-[500] text-[12px] md:text-[14px] lg:text-[16px]">Salary Range: <br /> <span className='font-[400]'>{job.salary_lower_range}</span> - <span className='font-[400]'>{job.salary_upper_range}</span> </p>
      </div>
    </div>
  );
}
