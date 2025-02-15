"use client"

import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import OTPInput from 'react-otp-input'
import Navbar from '../../components/nav-bar/Navbar'
import { useParams, useRouter } from 'next/navigation'
import { post } from '../../utils/axiosHelpers'
import BtnLoader from '../../components/btnLoader/BtnLoader'
import Alert from '../../components/alert/Alert'
import Cookies from 'js-cookie';
import Footer from '../../components/footer/Footer'
import { AxiosError } from 'axios'

export default function Page() {

    const [otp, setOtp] = useState<string>('')
    const router = useRouter()
    const { email } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')

    async function verifyAccount(){
        try {
            setIsLoading(true)
            const res = await post('/verify-token', {token:otp, email:decodeURIComponent(email as string)})
            console.log("Response =========== ", res);

            setAlertType('success')
            setMsg('Account verified successfully!')
            Cookies.set('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push('/complete-registeration')
            
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        } finally {
            setIsLoading(false);
        }
    }

    async function resendVerificationToken(){
        try {
            setIsLoading(true)
            const res = await post('/resend-activation-token', {email:decodeURIComponent(email as string)})
            console.log(res);

            setMsg(res?.message)
            setAlertType('success')
            
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setMsg(error.response?.data?.message || 'An error occurred');
            } else {
                setMsg('An unexpected error occurred.');
            }
            setAlertType('error');
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <>
        <Navbar />
        <div className='bg-[#F5F6F7]'>
            <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>My Account</h1>
                <p className='md:text-[15px] text-[12px]'>Home / Register / <span className='text-[#FF0200]'>Verify Account</span></p>
            </div>
        </div>
        <div className='w-[100%] mx-auto my-[7rem]'>
            <div className='w-[100%] md:w-[70%] mx-auto'>
                <div
                    className="center"
                    style={{ padding: "0 8vw", position: "relative" }}
                >
                    <div style={{ maxWidth: 664, width: "100%", paddingBottom: 90 }}>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-1 cursor-pointer' onClick={() => router.back()}>
                                <GoChevronLeft />
                                <p>Back</p>
                            </div>
                            <p className='text-[#19201D] text-[22px] font-[500]'>Verify your Email Address</p>
                            <p></p>
                        </div>
                        <p className='text-[14px] text-[#828282] mb-[35px] mt-[2.5rem] text-center'>A verification code has been sent to your email address {decodeURIComponent(email as string)} Enter the code below to complete your registration.</p>
                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                            <OTPInput
                            value={otp}
                            inputType='number'
                            onChange={setOtp}
                            numInputs={4}
                            renderSeparator={<span style={{ visibility:'hidden' }}>---</span>}
                            renderInput={(props) => <input {...props} placeholder='1' style={{ width:"71px" }} className='text-center outline-none font-[500] h-[58px] rounded-[4px] w-[71px] border placeholder:text-[#BDBDBD59] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>}
                        />
                        </div>
                        {
                            isLoading ? 
                            <div className='mt-[2.5rem]'>
                                <BtnLoader />
                            </div>
                            :
                            <button onClick={verifyAccount} className='text-white bg-[#FF0200] w-full rounded-[4px] mt-[2.5rem] px-[35px] py-[10px] text-center mx-auto'>Proceed</button>
                        }
                        <p className='flex items-center justify-center gap-2 text-center mt-5'>Did not get a code? <span className='cursor-pointer text-[#FF0200]' onClick={resendVerificationToken}>Resend</span> </p>
                        {/* <p >Resend verification code</p> */}
                    </div>
                </div>
            </div>
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
        </div>
        <Footer />
    </>
  )
}