"use client"

import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/nav-bar/Navbar'
import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import Alert from '../components/alert/Alert'
import BtnLoader from '../components/btnLoader/BtnLoader'
import Cookies from 'js-cookie';
import { post } from '../utils/axiosHelpers';
import { BsEye, BsEyeSlash } from 'react-icons/bs'

export default function page() {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        try {
            if(!email) {
                setMsg('Please enter your email address.');
                setAlertType('error');
                return;
            }
            // Making the POST request using the helper function
            setLoading(true)
            const response = await post('/request-password-reset', {email});
            console.log(response);
            setMsg(response?.message);
            setAlertType('success');
            router.push(`/reset-password/${email}`)
            // window.location.assign('/dashboard');
        } catch (error: any) {
            console.log(error);
            // Handle errors from the POST request
            setMsg(error?.response?.data?.message);
            setAlertType('error');
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className='text-[14px]'>
        {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='py-[4rem] max-w-[1600px] mx-auto px-[4rem]'>
                <h1 className='text-[#101750] text-[32px] font-bold'>My Account</h1>
                <p>Home / <span className='text-[#FF0200]'>Forgot Password?</span></p>
            </div>
        </div>
        <div className='w-[544px] mx-auto mt-[4rem] p-[4rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Forgot Password?</h1>
            {/* <p className='mb-7'>Welcome back! We are happy to have you!.</p> */}
            <div>
                <p>Email</p>
                <input onChange={e => setEmail(e.target.value)} type="text" placeholder='johndoe@gmail.com' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            {
                loading ?
                <div className='mt-[40.4px] mb-[0.5rem]'>
                    <BtnLoader />
                </div>
                :
                <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handleSignIn}>Proceed</button>
            }
        </div>
        <Footer />
    </div>
  )
}
