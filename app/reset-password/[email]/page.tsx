"use client"

import React, { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/nav-bar/Navbar'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Alert from '../../components/alert/Alert'
import BtnLoader from '../../components/btnLoader/BtnLoader'
import { post } from '../../utils/axiosHelpers'
import { BiChevronLeft } from 'react-icons/bi'
import { useParams, useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

export default function Page() {

    const router = useRouter()
    const { email } = useParams()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordResetData, setPasswordResetData] = useState({
        password: '',
        confirmPassword: '',
        token: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPasswordResetData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            if (!passwordResetData.password || !passwordResetData.confirmPassword) {
                setMsg('Please fill in all fields.');
                setAlertType('error');
                return;
            }
            if (passwordResetData.password !== passwordResetData.confirmPassword) {
                setMsg('Passwords do not match.');
                setAlertType('error');
                return;
            }
    
            setLoading(true);
            const response = await post('/set-new-password', {
                email: decodeURIComponent(email as string),
                password: passwordResetData.password,
                token: passwordResetData.token,
            });
    
            setMsg(response?.message);
            setAlertType('success');
            router.push(`/sign-in`);
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
    };

  return (
    <div className='text-[14px]'>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>My Account</h1>
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Password Reset</span></p>
            </div>
        </div>
        <div className='md:w-[544px] mx-auto mt-[4rem] md:p-[4rem] py-[4rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <div className='flex items-center gap-4 mb-7'>
                <div className='bg-white p-3 text-[20px] shadow-md rounded-[6px] cursor-pointer' onClick={() => router.back()}>
                    <BiChevronLeft />
                </div>
                <h1 className='font-[600] text-[#101750] text-[24px]'>Reset Account Password</h1>
            </div>
            {/* <p className='mb-7'>Welcome to Zillow9ja. Let's create your account</p> */}
            <div>
                <p>Token</p>
                <input type="text" placeholder='****' onChange={handleInputChange} name='token' value={passwordResetData.token} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            <div className='mt-6'>
                <p>Password</p>
                <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                    <input value={passwordResetData.password} name='password' onChange={handleInputChange} type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                    {
                        showPassword?
                        <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                        :
                        <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)}/>
                    }
                </div>
            </div>
            <div className='mt-6'>
                <p>Confirm Password</p>
                <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                    <input value={passwordResetData.confirmPassword} name='confirmPassword' onChange={handleInputChange} type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                    {
                        showPassword?
                        <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)}/>
                        :
                        <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)}/>
                    }
                </div>
            </div>
            {
                loading ?
                <div className='mt-[40.4px] mb-[0.5rem]'>
                    <BtnLoader />
                </div>
                :
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handleSubmit}>Reset Password</button>
            }
        </div>
        <Footer />
    </div>
  )
}
