"use client"

import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/nav-bar/Navbar'
// import { FcGoogle } from 'react-icons/fc'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import Alert from '../components/alert/Alert'
import BtnLoader from '../components/btnLoader/BtnLoader'
import { post } from '../utils/axiosHelpers'
import { BiChevronDown } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { AxiosError } from 'axios'

export default function Page() {

    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [dropDown, setDropDown] = useState<string>('')
    const [msg, setMsg] = useState<string>('')
    const [alertType, setAlertType] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const roleArray = [
        { value: 'user', label: 'Teacher/Tutor' },
        { value: 'school_owner', label: 'School/Academy/EducationHub' },
        // { value: 'main_admin', label: 'Main Aadmin' }
    ]
    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
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
            if(!registerData.email || !registerData.password || !registerData.confirmPassword) {
                setMsg('Please fill in all fields.');
                setAlertType('error');
                return
            }
            if(registerData.password!== registerData.confirmPassword){
                setMsg('Passwords do not match.');
                setAlertType('error');
                return
            }
            setLoading(true)
            console.log("Sign Up");
            const response = await post('/register', {role:registerData.role, email: registerData.email, password: registerData.password});
            router.push(`/sign-up/${registerData.email}`)
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
                <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>Register</span></p>
            </div>
        </div>
        <div className='md:w-[544px] mx-auto mt-[4rem] md:p-[4rem] py-[4rem] px-[1rem] shadow-xl text-[#9096B2] mb-[9rem]'>
            <h1 className='font-[600] text-[#101750] text-[24px] mb-7'>Create account</h1>
            {/* <p className='mb-7'>Welcome to Zillow9ja. Let's create your account</p> */}
            <div>
                <p>Email</p>
                <input type="text" placeholder='jhondoe@gmail.com' onChange={handleInputChange} name='email' value={registerData.email} className='outline-none block border border-[#C2C5E1] h-[42px] rounded-[6px] w-full pl-2' />
            </div>
            <div className='w-full mt-6 relative'>
                <p>Register as a:</p>
                <div onClick={() => setDropDown(dropDown === 'user-type' ? '' : 'user-type' )} className='border border-[#C2C5E1] h-[42px] pl-2 rounded-[6px] pr-2 flex items-center justify-between cursor-pointer'>
                    <p>{registerData.role}</p>
                    <BiChevronDown className='text-[20px]'/>
                </div>
                {
                    dropDown === 'user-type' && (
                        <div className='absolute z-10 top-[65px] bg-[#fff] rounded-[8px] w-full border border-[#C2C5E1] h-[80px] overflow-y-auto'>
                            {
                                roleArray.map((role, index) => (
                                    <div key={index} onClick={() => {
                                        setRegisterData({...registerData, role: role.value })
                                        setDropDown('')
                                    }} 
                                    className='py-2 px-2 text-[14px] border-b-[#C2C5E1] border-b-0 cursor-pointer hover:bg-[#F5F6F7]'>{role.label}</div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className='mt-6'>
                <p>Password</p>
                <div className='border border-[#C2C5E1] h-[42px] rounded-[6px] mt-1 pr-2 flex items-center justify-between'>
                    <input value={registerData.password} name='password' onChange={handleInputChange} type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
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
                    <input value={registerData.confirmPassword} name='confirmPassword' onChange={handleInputChange} type={showPassword ? "text" : "password"} placeholder='********' className='pl-2 w-full outline-none' />
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
            <div className='flex items-center gap-2 text-[12px] mt-4'>
                <input type="checkbox" />
                <p>By submitting, I agree to the terms and conditions of get a school</p>
            </div>
            {/* <div className='flex items-center mt-5'>
                <p className='h-[1px] bg-[#777575] w-full'></p>
                <p className='px-4'>OR</p>
                <p className='h-[1px] bg-[#777575] w-full'></p>
            </div> */}
            {/* <button className='w-full text-[#212121] border border-[#C2C5E1] py-[0.4rem] mt-6 rounded-[6px] flex items-center justify-center gap-4'> <FcGoogle /> Continue with Google</button> */}
            <p className='text-[13px] mt-5 text-center'>Already have an account? <span className='text-[#FF0200] cursor-pointer' onClick={() => router.push('/sign-in')}>Log In</span> </p>
        </div>
        <Footer />
    </div>
  )
}
