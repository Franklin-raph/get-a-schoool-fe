"use client"

import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/nav-bar/Navbar'
// import { FcGoogle } from 'react-icons/fc'
import { useRouter } from 'next/navigation'
import Alert from '../components/alert/Alert'
import BtnLoader from '../components/btnLoader/BtnLoader'
import Cookies from 'js-cookie'
import { post } from '../utils/axiosHelpers'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AxiosError } from 'axios'

export default function Page() {

    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const handleSignIn = async () => {
        try {
            if (!email || !password) {
                setMsg('Please enter your email and password.')
                setAlertType('error')
                return
            }
            setLoading(true)
            const response = await post('/login', { email, password })
            console.log(response)
            Cookies.set('token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            setMsg(`Login successful! Welcome`)
            setAlertType('success')
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.data?.is_active === false) {
                    router.push(`/register/${email}`)
                }
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='text-[14px]'>
            {msg && <Alert alertType={alertType} msg={msg} setMsg={setMsg} />}
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>My Account</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Login</span></p>
                </div>
            </div>
            <div className='md:w-[544px] mx-auto mt-[4rem] md:p-[4rem] py-[4rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
                <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Login</h1>
                <div>
                    <p>Email</p>
                    <input onChange={e => setEmail(e.target.value)} type="text" placeholder='johndoe@gmail.com' className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
                </div>
                <div className='mt-8'>
                    <p>Password</p>
                    <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                        <input onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
                        {
                            showPassword ?
                                <BsEyeSlash className='cursor-pointer' onClick={() => setShowPassword(false)} />
                                :
                                <BsEye className='cursor-pointer' onClick={() => setShowPassword(true)} />
                        }
                    </div>
                </div>
                <p className='text-right font-[300] cursor-pointer text-[13px] mt-1' onClick={() => router.push('/forgot-password')}>Forgot your password?</p>
                {
                    loading ?
                        <div className='mt-[40.4px] mb-[0.5rem]'>
                            <BtnLoader />
                        </div>
                        :
                        <button className='w-full bg-[#FF0200] text-white py-[0.4rem] mt-6 rounded-[6px]' onClick={handleSignIn}>Sign In</button>
                }
                {/* <div className='flex items-center mt-5'>
                    <p className='h-[1px] bg-[#777575] w-full'></p>
                    <p className='px-4'>OR</p>
                    <p className='h-[1px] bg-[#777575] w-full'></p>
                </div>
                <button className='w-full text-[#212121] border border-[#C2C5E1] py-[0.4rem] mt-6 rounded-[6px] flex items-center justify-center gap-4'>
                    <FcGoogle /> Continue with Google
                </button> */}
                <p className='text-[13px] mt-5 text-center'>Don&apos;t have an Account? <span className='text-[#FF0200] cursor-pointer' onClick={() => router.push('/sign-up')}>Create account</span> </p>
            </div>
            <Footer />
        </div>
    )
}
