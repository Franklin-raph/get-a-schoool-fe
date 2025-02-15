"use client"

import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/nav-bar/Navbar'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Alert from '../components/alert/Alert'
import BtnLoader from '../components/btnLoader/BtnLoader'
import { post } from '../utils/axiosHelpers'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

export default function Page() {

    const router = useRouter()
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
        console.log(passwordResetData);
        
        // Validation
        try {
            if(!passwordResetData.password || !passwordResetData.confirmPassword) {
                setMsg('Please fill in all fields.');
                setAlertType('error');
                return
            }
            if(passwordResetData.password!== passwordResetData.confirmPassword){
                setMsg('Passwords do not match.');
                setAlertType('error');
                return
            }
            setLoading(true)
            console.log("Sign Up");
            const response = await post('/register', {email:"lll", password: passwordResetData.password, token:passwordResetData.token});
            router.push(`/login`)
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
            <div className='py-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
                <h1 className='text-[#101750] text-[32px] font-bold'>My Account</h1>
                <p>Home / <span className='text-[#FF0200]'>Reset Password</span></p>
            </div>
        </div>
        <div className='w-[544px] mx-auto mt-[4rem] p-[4rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Reset account Password</h1>
            <div>
                <p>Token</p>
                <input type="text" placeholder='1234' onChange={handleInputChange} name='token' value={passwordResetData.token} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
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
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handleSubmit}>Sign Up</button>
            }
        </div>
        <Footer />
    </div>
  )
}
