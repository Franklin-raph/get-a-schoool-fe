"use client"

import React from 'react'
import Navbar from '../components/nav-bar/Navbar'
import Footer from '../components/footer/Footer'

export default function Page() {

    return (
        <div>
            <Navbar />
            <div className='bg-[#F5F6F7]'>
                <div className='md:py-[4rem] py-[2rem] max-w-[1600px] mx-auto md:px-[4rem] px-[1.2rem]'>
                    <h1 className='text-[#101750] md:text-[32px] text-[22px] font-bold'>About Us</h1>
                    <p className='md:text-[15px] text-[12px]'>Home / <span className='text-[#FF0200]'>about-us</span></p>
                </div>
            </div>
            <div className='py-[4rem] max-w-[1600px] mx-auto md:px-[4rem] px-[0.8rem] grid gap-5'>
                <p className='md:text-[16px] text-[14px]'>GetASchool is a startup working on bridging the gap in the job hunting industry by stimulating the stress of reaching out to employees by employers to be free without stress and thereby exposing employees to a variety of job opportunities.</p>
                <p className='md:text-[16px] text-[14px]'>GetASchool is bridging the barriers between employers and employees, creating common ground for common entities and common people by giving them that trust to corporate for effective transactions among themselves. Hence, creating jobs for job seekers and creating more options for job creators from anywhere and anytime.</p>
                <div>
                    <p className='md:text-[35px] text-[20px] font-[600] text-[#FF0200]'>Our Advisors</p>
                    <p className='text-gray-500 md:text-[15px] text-[12px]'>GetASchool.com Advisors are distinguished professors and intellectuals who have vetted and analysed the GetASchool.com roadmap and have confirmed that the GetASchool mission is workable and applaudable before the GetASchool launch and they continue to advise GetASchool where necessary.</p>
                </div>

                <div className='pt-[1rem]'>
                    <p className='font-[500] text-[18px]'>Meet our Advisors:</p>
                    <div className='py-[1.4rem] grid md:grid-cols-3 sm:grid-cols-2 gap-5'>
                        <div className='border p-5 rounded-[10px]'>
                            <img src="./images/presentation.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                            <p className="text-[#FF0200] text-[22px] font-bold mb-1">Prof. Chika Moore</p>
                            <p>
                                Professor of Mathematics, UNIZIK <br />
                                Ex. Chairman Nigeria Population Commission, <br />
                                Anambra State.
                            </p>
                        </div>
                        <div className='border p-5 rounded-[10px]'>
                            <img src="./images/female.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                            <p className="text-[#FF0200] text-[22px] font-bold mb-1">Prof. M. A. Abdulazeez</p>
                            <p>
                                ATBU-Bauchi Vice Chancellor <br />
                                Bauchi. <br />
                                Professor Of Physics, ATBU Bauchi.
                            </p>
                        </div>
                        <div className='border p-5 rounded-[10px]'>
                            <img src="./images/seminar.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                            <p className="text-[#FF0200] text-[22px] font-bold mb-1">Dr. Bertram C. Iloka,mni.</p>
                            <p>
                                Director General, ICT-HQ, <br />
                                Nigeria Population Commission, Abuja.
                            </p>
                        </div>
                        <div className='border p-5 rounded-[10px]'>
                            <img src="./images/audit.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                            <p className="text-[#FF0200] text-[22px] font-bold mb-1">Dr. U. Obi</p>
                            <p>
                                Strauss Preparatory Founder <br />
                                Maitama, Abuja.
                            </p>
                        </div>
                        <div className='border p-5 rounded-[10px]'>
                            <img src="./images/seminar.png" className='md:w-[150px] w-[100px] rounded-full mb-5' alt="" />
                            <p className="text-[#FF0200] text-[22px] font-bold mb-1">Dr. Femi S. Adeloju</p>
                            <p>
                                S.A to Director General, <br />
                                National Mathematical Centre, Abuja.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}