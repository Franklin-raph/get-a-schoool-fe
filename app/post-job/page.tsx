"use client"

import React, { useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import Footer from '../components/footer/Footer'
// import { useRouter } from 'next/navigation'
import { BiChevronDown } from 'react-icons/bi'
import BtnLoader from '../components/btnLoader/BtnLoader'
import { post } from '../utils/axiosHelpers'
import { AxiosError } from 'axios'
import Alert from '../components/alert/Alert'
import 'react-quill-new/dist/quill.snow.css';
import { formats, modules } from "../utils/quillEditorConfig"

import dynamic from 'next/dynamic'
// import { LuImage } from 'react-icons/lu'

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => (
      <div className="h-[450px] bg-stone-100/80 animate-pulse rounded-md" />
    ),
});

export default function Page() {

    const [dropDown, setDropDown] = useState<string>('')
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [description, setDescription] = useState<string>('')
    const salaryRangeArray = [
        { salary_lower_range: 20000, salary_upper_range: 30000, label: '20,000 to 30,000' },
        { salary_lower_range: 40000, salary_upper_range: 50000, label: '40,000 to 50,000' },
        { salary_lower_range: 60000, salary_upper_range: 70000, label: '60,000 to 70,000' },
        { salary_lower_range: 80000, salary_upper_range: 90000, label: '80,000 to 90,000' },
        { salary_lower_range: 100000, salary_upper_range: 110000, label: '100,000 to 110,000' }
    ]
    const [jobData, setJobData] = useState({
        salary_lower_range: 0,
        salary_upper_range: 0,
        salary: '',
        location: '',
        title: '',
        cover_image: '',
        // lga: '',
        // landmark: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        console.log({ salary_lower_range:jobData.salary_lower_range, salary_upper_range:jobData.salary_upper_range, location:jobData.location, description, jobData });
        
        try {
            if(!jobData.title || !jobData.salary || !description || !jobData.location) {
                setMsg('Please fill in all fields.');
                setAlertType('error');
                return
            }

            // Check if description is less than 200 characters
            if(description.length < 200) {
                setMsg('Job description must be at least 200 characters.');
                setAlertType('error');
                return;
            }
            setLoading(true)
            const response = await post('/job-posts/', { salary_lower_range:jobData.salary_lower_range, salary_upper_range:jobData.salary_upper_range, location:jobData.location, description, title:jobData.title })
            setMsg('Job posted successfully.');
            setAlertType('success');
            console.log(response)
            setLoading(false)
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        }finally{
            setLoading(false)
        }
    }

  return (
    <div>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Job</h1>
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Post Job</span></p>
            </div>
        </div>
        <div className='md:w-[844px] mx-auto md:mt-[4rem] md:p-[4rem] py-[4rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Post a school</h1>
            <div className='mt-6'>
                <p>Job Title</p>
                <input type="text" onChange={handleInputChange} placeholder='Software Engineer' name="title" className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='w-full mt-6 relative'>
                <p>Salary Range</p>
                <div onClick={() => setDropDown(dropDown === 'user-type' ? '' : 'user-type' )} className='border border-[#C2C5E1] h-[42px] pl-2 rounded-[6px] pr-2 flex items-center justify-between cursor-pointer'>
                    <p>{jobData.salary}</p>
                    <BiChevronDown className='text-[20px]'/>
                </div>
                {
                    dropDown === 'user-type' && (
                        <div className='absolute z-10 top-[70px] bg-[#fff] rounded-[8px] w-full border border-[#C2C5E1] h-[150px] overflow-y-auto'>
                            {
                                salaryRangeArray.map((salary, index) => (
                                    <div key={index} onClick={() => {
                                        setJobData({...jobData, salary_lower_range: salary.salary_lower_range, salary_upper_range: salary.salary_upper_range, salary: salary.label })
                                        setDropDown('')
                                    }} 
                                    className='py-2 px-2 text-[14px] border-b-[#C2C5E1] border-b-0 cursor-pointer hover:bg-[#F5F6F7]'>{salary.label}</div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className='mt-6'>
                <p>Location of school</p>
                <input type="text" onChange={handleInputChange} placeholder='Lagos State' name="location" className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-6'>
                <p>Description</p>
                <ReactQuill theme="snow" className='react-quill' value={description} onChange={e => setDescription(e)} formats={formats} modules={modules} />
            </div>
            {
                loading ?
                <div className='mt-[40.4px] mb-[0.5rem]'>
                    <BtnLoader />
                </div>
                :
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-8 rounded-[6px]' onClick={handleSubmit}>Post</button>
            }
            <p className='italic text-[14px] mt-5'>Note: While we strive to give you the best user experience, in order to get the best of GetASchool; please ensure that your posts, comments, etc doesn&apos;t violate GetASchool policy</p>
        </div>
        <Footer />
    </div>
  )
}