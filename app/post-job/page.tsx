"use client"

import React, { useState } from 'react'
import Navbar from '../components/nav-bar/Navbar'
import Footer from '../components/footer/Footer'
import { useRouter } from 'next/navigation'
import { BiChevronDown } from 'react-icons/bi'
import BtnLoader from '../components/btnLoader/BtnLoader'

export default function Page() {

    const router = useRouter()
    const [dropDown, setDropDown] = useState<string>('')
    // const [msg, setMsg] = useState<string>('')
    // const [alertType, setAlertType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const salaryRangeArray = [
        { value: '20_30', label: '20,000 to 30,000' },
        { value: '31_40', label: '31,000 to 40,000' },
        { value: '31_40', label: '41,000 to 50,000' },
        { value: '31_40', label: '51,000 to 70,000' },
        { value: '31_40', label: '71,000 to 100,000' },
        { value: '31_40', label: '100,000 and above' }
    ]
    const [jobData, setJobData] = useState({
        salary: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(false)
        router.refresh()
    }

  return (
    <div>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>Job</h1>
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Post Job</span></p>
            </div>
        </div>
        <div className='md:w-[544px] mx-auto md:mt-[4rem] md:p-[4rem] py-[4rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Post a school</h1>
            {/* <p className='mb-7'>Welcome to Zillow9ja. Let's create your account</p> */}
            <div>
                <p>School address</p>
                <input type="text" placeholder='123 Abc Street' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-6'>
                <p>School phone number</p>
                <input type="text" placeholder='081-123-123-12' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='w-full mt-6 relative'>
                <p>Select Role</p>
                <div onClick={() => setDropDown(dropDown === 'user-type' ? '' : 'user-type' )} className='border border-[#C2C5E1] h-[42px] pl-2 rounded-[6px] pr-2 flex items-center justify-between cursor-pointer'>
                    <p>{jobData.salary}...</p>
                    <BiChevronDown className='text-[20px]'/>
                </div>
                {
                    dropDown === 'user-type' && (
                        <div className='absolute z-10 top-[65px] bg-[#fff] rounded-[8px] w-full border border-[#C2C5E1] h-[150px] overflow-y-auto'>
                            {
                                salaryRangeArray.map((salary, index) => (
                                    <div key={index} onClick={() => {
                                        setJobData({...jobData, salary: salary.label })
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
                <p>State of school</p>
                <input type="text" onChange={handleInputChange} placeholder='Lagos State' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-6'>
                <p>LGA of school</p>
                <input type="text" placeholder='Alimosho Local Government Area' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            <div className='mt-6'>
                <p>Landmark around the school</p>
                <input type="text" placeholder='Alimosho Local Government Area' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2 mt-1' />
            </div>
            {
                loading ?
                <div className='mt-[40.4px] mb-[0.5rem]'>
                    <BtnLoader />
                </div>
                :
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-8 rounded-[6px]' onClick={handleSubmit}>Save</button>
            }
        </div>
        <Footer />
    </div>
  )
}
