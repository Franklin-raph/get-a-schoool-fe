"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation'

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import Navbar from './components/nav-bar/Navbar';
import Footer from './components/footer/Footer';
import NewlyPostedJobsComponent from './components/newly-posted-jobs-component/NewlyPostedJobsComponent';
import BlogComponent from './components/blog-component/BlogComponent';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { PiDotDuotone } from 'react-icons/pi';
import { IoNotificationsOutline } from 'react-icons/io5';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

// import { ChevronLeft, ChevronRight } from 'react-icons/lucide-react'
// Define a type for your job posts

export default function Home() {

  const heroContent = [
    {
      heroText: 'Get the best teachers which specialise in (Featured Different Job Categories)',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img9.jpeg",
      buttonText: "Get hired by a school"
    },
    {
      heroText: 'Get all your CAC certificate (Business Name/Company/NGO) and other services at cheaper and fast rate 12hours...',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img1.jpeg",
      buttonText: "Get hired by a school"
    },
    {
      heroText: 'Get your school to reach thousands of Peoples and Parents (Want to Advertize????)',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img2.jpeg",
      buttonText: "Hire a staff now"
    },
    {
      heroText: 'Add your school to be among the top viewed schools in your area (ADD YOUR SCHOOL TO OUR FOOTPAGE GALLERY) ',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img3.jpeg",
      buttonText: "Schedule a seminar for your staff"
    },
    {
      heroText: 'Get the best teachers which specialise in (Featured Different Job Categories)',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img4.jpeg",
      buttonText: "Get hired by a school"
    },
    {
      heroText: 'Get your school to reach thousands of Peoples and Parents (Want to Advertize????)',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img5.jpeg",
      buttonText: "Hire a staff now"
    },
    {
      heroText: 'Add your school to be among the top viewed schools in your area (ADD YOUR SCHOOL TO OUR FOOTPAGE GALLERY) ',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img6.jpeg",
      buttonText: "Schedule a seminar for your staff"
    },
    {
      heroText: 'Get your school to reach thousands of Peoples and Parents (Want to Advertize????)',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img7.jpeg",
      buttonText: "Hire a staff now"
    },
    {
      heroText: 'Add your school to be among the top viewed schools in your area (ADD YOUR SCHOOL TO OUR FOOTPAGE GALLERY) ',
      // servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/img8.jpeg",
      buttonText: "Schedule a seminar for your staff"
    }
  ];

  const faqItems = [
    {
      question: 'What is GetASchool.com?',
      answer: 'GetASchool.com is an online edu-oriented platform that gives schools owners and teachers a leverage to interact with themselves when it comes to job seeking and hiring competent staff for betterment of the education sector.',
    },
    {
      question: 'How do I get School to hire me?',
      answer: 'You just have to scroll around the GetAschool.com and see the school that matches your expectations and send a direct message to them in order to schedule interview with them and be hired.',
    },
    {
      question: 'How do I hire staff as a school owner?',
      answer: 'Get registered and scroll around to see job seeking post from teachers and send any that matches your expectations a direct message and fix a date for physical interview. Or You can make a post for vacancies in your School and teachers will inbox you.',
    },
    {
      question: 'How Trusted are Schools on GetASchool.com?',
      answer: "Schools on GetASchool.com are trust worthy because they are registered with Corporate Affairs Commission, but GetASchool.com is assuring you of 100% guarantee on Schools with verification tick/batch✔️",
    },
    {
      question: 'Are teachers paying for any subscription fee on GetASchool.com?',
      answer: 'NO; but teachers who have being using GetASchool.com to get jobs do support what we are doing by donating a token to help us maintain this platform. You too can support us by donating to our account  (8276845135 MONIEPOINT GETASCHOOL.COM Ltd)',
    },
    {
      question: 'Are School or School Owners paying for any subscription fee on GetASchool.com?',
      answer: `NO, but School and School Owners who have being using GetASchool.com to hire teachers and non academic staff do appreciate us by supporting what we are doing with any little token to help us maintain this platform. \n You can also help to maintain this platform by donating to our account (8276845135 MONIEPOINT GETASCHOOL.COM Ltd)`,
    },
    {
      question: 'How is GetASchool.com earning a token after the services renders to Schools, Teachers, and co...?',
      answer: `GetASchool.com offers other services like all kinds of CAC Registration & services, other services to Schools like Seminars/Symposium for teachers and School Managers/Owners; Managerial and Financial Analysis needed for growth of any School, and other educative services. For more information: Call/Chat 09031317411`,
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // const contactMethods = [
  //   {
  //     title: 'Call',
  //     number: '+23489031317411',
  //     icon: <PiPhoneCall />,
  //     btnText: 'Call Now',
  //     link: 'tel:+23489031317411'
  //   },
  //   {
  //     title: 'Message',
  //     number: 'info@getaschool.com',
  //     icon: <FaRegMessage />,
  //     btnText: 'Send Message',
  //     link: 'mailto:info@getaschool.com'
  //   },
  //   {
  //     title: 'Twitter',
  //     number: '',
  //     icon: <BsTwitterX />,
  //     btnText: 'Send Message',
  //     link: 'https://x.com/GetASchoolcom?t=L5CCpb4NIyiY4eGkwHth4A&s=09'
  //   },
  //   {
  //     title: 'Facebook',
  //     number: '',
  //     icon: <FaFacebook />,
  //     btnText: 'Send Message',
  //     link: 'https://www.facebook.com/share/1J9u54K1Yq/?mibextid=qi2Omg'
  //   },
  //   {
  //     title: 'Instagram',
  //     number: '',
  //     icon: <BsInstagram />,
  //     btnText: 'Send Message',
  //     link: 'https://www.instagram.com/getaschool?igsh=YTNnaXZpb3NtMG1p'
  //   },
  //   {
  //     title: 'Tiktok',
  //     number: '',
  //     icon: <BsTiktok />,
  //     btnText: 'Send Message',
  //     link: 'https://www.tiktok.com/@getaschool.com?_t=ZM-8wEEK5uPEKF&_r=1'
  //   }
  // ];

  const router = useRouter()

  const announcement = ["Get your CAC Business Name or Company or NGO certificate and others certificates at DISCOUNTED price that is ending soon; pay for your CAC annual returns, and update your CAC with our fast services... Remember that we are not charging you for using this platform to get a job or make a post (be you a teacher or School Owner)... But if you like what we do and will like to appreciate what we do, you can support us to maintain this platform by donating with any amount. (Our Account details: 8276845135, Moniepoint, GetASchool.com Ltd)..... Remember to ensure that the school you are visiting for interview has a verification tick ☑️ to avoid any risk/fraudulent activities. You can call/chat us on 09031317411 for your enquiry or complain...#GetASchool."]



  return (
    <div>
      <Navbar />
      <div className='bg-[#FF0200] flex items-center py-2'>
        <div className='p-2 text-white'>
          <IoNotificationsOutline />
        </div>
        <Marquee>
          {
            announcement.map((item, index) => {
              return(
                <div key={index} className='flex items-center gap-1 text-color text-[14px] mx-[20px]'>
                  <PiDotDuotone className='md:text-[20px] text-white'/>
                  <p className='text-white text-[14px] md:text-[16px]'>{item}</p>
                </div>
              )
            })
          }
        </Marquee>
      </div>
      <section className="w-[100%]">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          // breakpoints={{
          //   0: {
          //     slidesPerView: 2,
          //   },
          //   1024: {
          //     slidesPerView: 3,
          //   },
          // }}
          modules={[Pagination, Autoplay]}
          className="mySwiper h-[650px]"
          loop={true}
          style={{
            '--swiper-pagination-color': '#FF0200', // Active bullet color
            '--swiper-pagination-bullet-inactive-color': '#999999', // Inactive bullet color
            '--swiper-pagination-bullet-inactive-opacity': '0.5', // Inactive bullet opacity
            '--swiper-pagination-bullet-size': '8px', // Bullet size
            '--swiper-pagination-bullet-horizontal-gap': '6px', // Space between bullets
            // '--swiper-pagination-top': '353px', // Move pagination down
          } as React.CSSProperties}
        >
          {heroContent.map((content, index) => (
            <SwiperSlide key={index}>
              <div className='mb-5 shadow-md rounded-[20px] relative md:h-full h-[50vh]'>
                <div className='absolute bg-[#212121a8] text-white h-full w-full px-3 py-1 md:text-[14px] text-[12px] rounded-r-[5px] flex flex-col items-center justify-center'>
                  <div className='text-center w-[90%] mx-auto'>
                    <p className='lg:text-[40px] md:text-[30px] text-[20px] font-bold'>
                      {content.heroText}
                    </p>
                    {/* <p className='text-[18px]'>
                      {content.servicesText}
                    </p> */}
                    <button className='bg-transparent hover:bg-[#FF0200] transition-all py-4 px-5 border mt-5'>
                      {content.buttonText}
                    </button>
                  </div>
                </div>
                <img src={content.image} alt="" className='w-full h-full object-cover'/>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* <div className='bg-[#FF0200] flex items-center py-2'>
        <div className='p-2 text-white'>
          <IoNotificationsOutline />
        </div>
        <Marquee>
          {
            announcement.map((item, index) => {
              return(
                <div key={index} className='flex items-center gap-1 text-color text-[14px] mx-[20px]'>
                  <PiDotDuotone className='text-[20px] text-white'/>
                  <p className='text-white text-[14px] md:text-[16px]'>{item}</p>
                </div>
              )
            })
          }
        </Marquee>
      </div> */}

      <section>
        <div className='mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto flex items-center justify-between'>
          <div className='text-left w-[70%]'>
            <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>Newly Posted Jobs</p>
            {/* <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p> */}
          </div>
          <button onClick={() => router.push('/search-for-jobs')} className='text-[12px] border rounded-full md:px-4 px-2 py-2 w-[110px]'>View More</button>
        </div>

        <div className="relative md:w-[85%] w-[95%] mx-auto overflow-visible"> {/* Add padding to make room for arrows */}
          {/* {
            jobs?.
          } */}
          <NewlyPostedJobsComponent />
        </div>
      </section>

      <section>
        <div className='text-left mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto'>
          <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>About Us</p>
          {/* <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p> */}
        </div>
        <div className='flex items-start justify-between flex-col md:flex-row md:w-[85%] w-[95%] mx-auto mt-8 gap-5'>
          <img src="./images/School-Kids-scaled.jpg" alt="" className='md:w-[450px] w-full rounded-[12px]' />
          <div className='grid gap-7'>
            <div>
              <p className='md:text-[16px] text-[14px]'>GetASchool is a startup working on bridging the gap in the job hunting industry by stimulating the stress of reaching out to employees by employers to be free without stress and thereby exposing employees to a variety of job opportunities.</p>
            </div>
            <div>
              <p className='md:text-[16px] text-[14px]'>GetASchool is bridging the barriers between employers and employees, creating common ground for common entities and common people by giving them that trust to corporate for effective transactions among themselves. Hence, creating jobs for job seekers and creating more options for job creators from anywhere and anytime.</p>
            </div>
            <div>
              <Link href='/about-us' className="inline-block py-[10px] px-[20px] bg-[#FF0200] text-white mt-[2rem] rounded-[8px]">Read More</Link>
            </div>
          </div>
        </div>
      </section>
      {/* bg-gradient-to-r from-[#8b2e2e] to-[#FF0200] h-64 */}
      <section className='w-[100%] mx-auto mt-[6rem] bg-video flex flex-col items-center justify-center'>
        <div className="text-center flex flex-col items-center justify-center text-white mt-[60px] px-6">
          <p className="md:text-[20px] text-[16px]">
            There are thousands of parents, teachers, employees, guardians, aunties, uncles, elder brothers and sisters searching for the best school in GetASchool.
          </p>
          <button className="py-[10px] px-[20px] bg-[#FF0200] mt-[3rem] rounded-[8px]" onClick={() => router.push('/sign-up')}>Get Started</button>
        </div>
      </section>

      {/* <section>
        <div className='text-left mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto'>
          <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>Our Advisors</p>
        </div>
        <div className='grid md:grid-cols-3 gap-4 w-[85%] mx-auto mt-8'>
        </div>
      </section> */}

      {/* <section>
        <div className='text-left mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto'>
          <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>Our Services</p>
        </div>
        <div className='grid md:grid-cols-3 gap-4 w-[85%] mx-auto mt-8'>
          <ServicesCard />
        </div>
      </section> */}

      <section>
        <div className='mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto flex items-center justify-between'>
          <div className='text-left w-[60%]'>
            <p className='md:text-[35px] text-[20px] font-[600] md:mb-[-1px] mb-2 text-[#FF0200]'>Latest Blogs</p>
            {/* <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p> */}
          </div>
          {/* <button className='text-[12px] border rounded-full md:px-4 px-2 py-2 md:w-[120px] w-[110px]' onClick={() => router.push('/blog/post-blog')}>Create a blog</button> */}
        </div>
        <div >
          <BlogComponent  />
        </div>
        <div className='flex items-center justify-center mt-9'>
          <button className='text-[12px] border rounded-full px-4 py-2 flex items-center gap-4' onClick={() => router.push('/blog')}>
            <p>View All Blogs</p>
            <IoIosArrowRoundForward />
          </button>
        </div>
      </section>

      <section className='w-[100%] mx-auto mt-[6rem] bg-video2 flex flex-col items-center justify-center'>
        <div className="text-center flex flex-col items-center justify-center text-white mt-[60px] px-5">
          <p className="md:text-[30px] text-[22px] font-[600]">
            Get your school advertised by GetASchool for them to contact you easily.
          </p>
          <button onClick={() => router.push('/sign-up')} className="py-[10px] px-[20px] bg-[#FF0200] mt-[3rem] rounded-[8px]">Get Started</button>
        </div>
      </section>
      
      <section className="mt-[9rem] mb-[5rem]">
        <div className="text-center mb-5">
          <p className="text-[#212121] font-bold md:text-[30px] text-[20px]">Frequently Asked Questions</p>
          <p className="text-[#777575] text-[14px] md:text-[16px]">Got Questions? We&apos;ve Got Answers!</p>
        </div>
        <div className="max-w-[900px] mx-auto p-4">
          {faqItems.map((item, index) => (
            <div key={index} className="mb-4 border-b border-gray-200">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left py-2 flex justify-between items-center focus:outline-none"
              >
                <span className="text-md font-medium">{item.question}</span>
                <span className="transform transition-transform duration-200">
                  {activeIndex === index ? <RxMinus /> : <RxPlus />}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="py-2 text-[#212121] text-[14px] md:text-[16px] answer-text">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-[9rem] mb-[10rem]">
        <div className="text-center mb-5">
          <p className="text-[#212121] font-bold md:text-[30px] text-[20px]">Our Patners</p>
          <div className='grid sm:grid-cols-4 grid-cols-2 items-center gap-[30px] sm:gap-[50px] md:gap-[80px] md:w-[800px] w-[95%] mx-auto mt-9'>
            <img src="./images/APSON.jpeg" alt="" className='md:w-[100%] w-[80%] mx-auto'/>
            <img src="./images/NAPPS.jpeg" alt="" className='md:w-[100%] w-[80%] mx-auto'/>
            <img src="./images/NSP.jpeg" alt="" className='md:w-[100%] w-[80%] mx-auto'/>
            <img src="./images/OPSAN.jpeg" alt="" className='md:w-[100%] w-[80%] mx-auto'/>
          </div>
        </div>
      </section>

      {/* <section className="md:max-w-[1600px] w-[95%] mx-auto lg:px-[2rem] flex items-start">
        <div>
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h3 className="text-[#FF0200] font-medium mb-2">Contact Us</h3>
              <h2 className="md:text-4xl text-xl font-bold text-navy-900 mb-4 text-[#212121]">Easy to contact us</h2>
              <p className="text-[#212121] mb-8 text-[14px] md:text-[16px]">
                We always ready to help by providing the best services for you. We beleive a good place to live can make your life better.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
                {contactMethods.map((method, index) => (
                  <div 
                    key={index} 
                    className="p-4 bg-white rounded-lg shadow-sm border contact cursor-pointer"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-[32px] h-[32px] bg-[#FF0200] rounded-full flex items-center justify-center text-white">
                        {method.icon}
                      </div>
                      <div>
                        <h3 className="font-medium md:text-lg">{method.title}</h3>
                        <p className="text-[#121212] text-[14px] md:text-[16px]">{method.number}</p>
                      </div>
                    </div>
                    <a target='_blank' className="w-full block text-center py-3 bg-[#ffeded] text-[#121212] rounded-lg hover:bg-red-100 transition-colors" href={method.link}>
                      {method.btnText}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 hidden md:block">
              <img
                src="./images/contact.jpeg"
                alt="Contact Image"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
