"use client"

import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/nav-bar/Navbar'
import Alert from '../components/alert/Alert'
import BtnLoader from '../components/btnLoader/BtnLoader'
import { post, put } from '../utils/axiosHelpers'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export default function Page() {

    const router = useRouter()
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [registerData, setRegisterData] = useState({
        address: '',
        phone: '',
        full_name: '',
        bio: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        console.log(registerData);
        
        // Validation
        try {
            if(!registerData.address || !registerData.phone || !registerData.full_name || !registerData.bio) {
                setMsg('Please fill in all fields.');
                setAlertType('error');
                return
            }
            setLoading(true)
            console.log(registerData);
            const response = await put('/dashboard/update-profile', registerData);
            router.push(`/dashboard`)
            console.log(response);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='text-[14px]'>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>My Account</h1>
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Profile</span></p>
            </div>
        </div>
        <div className='md:w-[544px] mx-auto mt-[4rem] md:p-[4rem] pb-[4rem] pt-[2rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px]'>Complete Registeration</h1>
            <p className='mb-7'>Welcome to Get-a-school. Let&apos;s create your account profile</p>
            <div>
                <p>Full Name</p>
                <input type="text" placeholder='John Doe' onChange={handleInputChange} name='full_name' value={registerData.full_name} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            <div className='mt-6'>
                <p>Address</p>
                <input type="text" placeholder='No 1' onChange={handleInputChange} name='address' value={registerData.address} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            <div className='mt-6'>
                <p>Phone Number</p>
                <input type="text" placeholder='080-123-323-11' onChange={handleInputChange} name='phone' value={registerData.phone} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            <div className='mt-6'>
                <p>Bio</p>
                <input type="text" placeholder='John Doe' onChange={handleInputChange} name='bio' value={registerData.bio} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            {
                loading ?
                <div className='mt-[40.4px] mb-[0.5rem]'>
                    <BtnLoader />
                </div>
                :
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handleSubmit}>Continue</button>
            }
        </div>
        <Footer />
    </div>
  )
}
