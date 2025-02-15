import React from 'react';

interface NewlyPostedJobsCardProps {
  job: {
    image: string;
    jobTitle: string;
    link: string;
    salaryRange: string;
  };
}

export default function NewlyPostedJobsCards({ job }: NewlyPostedJobsCardProps) {
  return (
    <div>
      <div className="text-left px-7 border rounded-[15px] shadow py-6 cursor-pointer mx-1 h-[175px]">
        <img
          src={job.image}
          alt={job.jobTitle}
          className="w-[50px] h-[50px] rounded-full mr-auto object-cover"
        />
        <p className="mt-5 font-[500] text-[12px] md:text-[14px] lg:text-[16px]">Position: <span className='font-[400]'>{job.jobTitle}</span> </p>
        <p className="mt-1 font-[500] text-[12px] md:text-[14px] lg:text-[16px]">Salary Range: <span className='font-[400]'>{job.salaryRange}</span> </p>
      </div>
    </div>
  );
}
