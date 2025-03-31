"use client"

import React, { useEffect, useState } from 'react'
import SideNav from '../components/side-nav/SideNav'
import TopNav from '../components/top-nav/TopNav'
import { LuHouse } from 'react-icons/lu';
import { PiMoneyWavyLight } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { get, remove } from '../utils/axiosHelpers';
import { format } from 'timeago.js';
import { BsPostcard } from 'react-icons/bs';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../components/btnLoader/BtnLoader';
import Alert from '../components/alert/Alert';

interface JobPost {
  id?: string;
  title?: string;
  description?: string;
  created_at: string;
  salary_lower_range?: number;
  salary_upper_range?: number;
  // Add other properties as needed
}


export default function Page() {
  const [toggleNav, setToggleNav] = useState<boolean>(false)
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState<string>('')
  const [alertType, setAlertType] = useState<string>('')
  const [deleteJob, setDeleteJob] = useState<string | null | undefined>(null);
  const router = useRouter()

  const deleteJobFn = async () => {
    if (!deleteJob) return;
    
    try {
      setIsLoading(true);
      // Replace with your actual delete API call
      await remove(`/job-posts/${deleteJob}/`);
      
      // Remove the deleted job from the state
      // setJobs(jobs.filter(job => job.id !== deleteJob));
      setDeleteJob(null);
      setMsg('Job deleted successfully');
      setAlertType('success');
      setIsLoading(false);
      getAllJobs()
    } catch (err) {
      setMsg('Failed to delete job');
      setAlertType('error');
      setIsLoading(false);
      console.error(err);
    }
  };

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
          setMsg('Failed to fetch jobs');
          setIsLoading(false);
          console.error(err);
      }
  }

  useEffect(() => {
      getAllJobs();
  }, [])

  const handleToggleNav = (value: boolean) => {
    setToggleNav(value)
  }

  return (
    <div>
      {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
      <SideNav toggle={{
        toggleNav: toggleNav, 
        setToggleNav: handleToggleNav
      }}/>
      <div className={`w-full lg:w-[78%] ml-auto pb-5 ${toggleNav ? 'lg:ml-[22%]' : 'lg:ml-auto'}`}>
        <TopNav 
          toggle={{
            toggleNav: toggleNav,
            setToggleNav: handleToggleNav
          }}
          pageTitle={'Dashboard'}
        />
        <div className='mt-8'>
          <section className="w-[95%] mx-auto md:px-[1rem] px-[0px] pb-[80px]">
            <div className='flex items-center justify-between mb-4'>
                <p className="font-[#212121] font-[700] md:text-[25px] text-[18px] mb-3">Dashboard</p>
                <div className='flex items-center gap-3'>
                    {/* <button className='border rounded-[10px] px-5 py-2 hover:bg-[#FF0200] hover:text-white'>Create Blog Post</button> */}
                    <button className='border rounded-[10px] px-5 py-2 hover:bg-[#FF0200] hover:text-white' onClick={() => router.push('/post-job')} >Post A Job</button>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-b pb-5'>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <BsPostcard className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Jobs Posted:</span> {jobs.length} </p>
              </div>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <PiMoneyWavyLight className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Posts:</span> 123</p>
              </div>
              <div className='bg-[#F9F9F9] p-5 rounded-[10px]'>
                <LuHouse className='text-[30px] mb-5'/>
                <p className='text-[18px] text-[#212121] font-[500]'> <span>Total Posts:</span> 123</p>
              </div>
            </div>
          </section>
          <section className="w-[95%] mx-auto md:px-[1rem] px-[0px] pb-[80px]">
            <p className='font-[500] text-[20px]'>My Jobs</p>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-left">
                  <thead className="text-[12px] md:text-[14px] border-b">
                      <tr>
                          <th scope="col" className="px-6 py-3 th1 font-[700]">S/N</th>
                          <th scope="col" className="px-6 py-3 font-[700]">Job Title</th>
                          <th scope="col" className="px-6 py-3 font-[700]">Salary High</th>
                          <th scope="col" className="px-6 py-3 font-[700]">Salary Low</th>
                          <th scope="col" className="px-6 py-3 font-[700]">Date Posted</th>
                          <th scope="col" className="px-2 py-3 font-[700]">Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        jobs?.map((job, index) => {
                            return(
                                <tr style={{borderBottom:"1px solid #dcdcdc"}} key={index}>
                                    <td className="px-6 py-4">{index +1}</td>
                                    <td className="px-6 py-4 flex items-center gap-1">
                                      <p className='text-[12px] md:text-[16px]'></p>
                                    </td>
                                    <td className="px-6 py-4 text-[12px] md:text-[16px]">{job.salary_upper_range}</td>
                                    <td className="px-6 py-4 text-[12px] md:text-[16px]">{job.salary_lower_range}</td>
                                    <td className="px-6 py-4 capitalize text-[12px] md:text-[16px]">{format(job.created_at)}</td>
                                    <td className='px-6 py-4 flex gap-4 text-[18px]'>
                                      <BiPencil onClick={() => router.push(`/search-for-jobs/editJob/${job.id}`)} className='cursor-pointer'/>
                                      <BiTrash onClick={() => job?.id ? setDeleteJob(job.id) : null} className='cursor-pointer text-red-600'/>
                                    </td>
                                </tr>
                            )
                        })
                      }
                  </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {
          deleteJob &&
          <div>
              <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setDeleteJob('')}></div>
              <div className="bg-white w-[90%] sm:max-w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                  <div className="flex items-center justify-between border-b pb-[5px]">
                      <p className="text-[px]">Delete Unit</p>
                      <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setDeleteJob('')}/>
                  </div>
                  <div className='text-center mt-7'>
                      Are you sure, you want to delete this job?
                  </div>
                  {
                      isLoading ? 
                      <BtnLoader />
                      :
                      <button onClick={deleteJobFn} className='text-white bg-[#FF0200] w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[16px] text-center mx-auto'>Yes, Delete</button>
                  }
              </div>
          </div>
      }
    </div>
  )
}