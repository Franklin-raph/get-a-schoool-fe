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
import ServicesCard from './components/services-card/ServicesCard';
import Footer from './components/footer/Footer';
import NewlyPostedJobsComponent from './components/newly-posted-jobs-component/NewlyPostedJobsComponent';
import BlogComponent from './components/blog-component/BlogComponent';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxMinus, RxPlus } from 'react-icons/rx';
import { PiDotDuotone, PiPhoneCall } from 'react-icons/pi';
import { IoChatboxEllipsesOutline, IoNotificationsOutline, IoVideocamOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import Marquee from 'react-fast-marquee';
// import { get } from './utils/axiosHelpers';

// import { ChevronLeft, ChevronRight } from 'react-icons/lucide-react'
// Define a type for your job posts

export default function Home() {

  const heroContent = [
    {
      heroText: 'Lorem Ipsum',
      servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/child-girl-schoolgirl-elementary-school-student-123686003.webp",
      buttonText: "Get hired by a school"
    },
    {
      heroText: 'Lorem Ipsum Dolor',
      servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/School-Kids-scaled.jpg",
      buttonText: "Hire a staff now"
    },
    {
      heroText: 'Lorem Ipsum Dolor Cannabis',
      servicesText: 'Adeniran Ogunsanya Surulere, Lagos',
      image: "./images/Young-student-writing-in-notebook-in-school.webp",
      buttonText: "Schedule a seminar for your staff"
    }
  ];

  const faqItems = [
    {
      question: 'What is Next.js?',
      answer: 'Next.js is a React framework that enables functionality such as server-side rendering and generating static websites.',
    },
    {
      question: 'What is Tailwind CSS?',
      answer: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.',
    },
    {
      question: 'How do I use TypeScript with Next.js?',
      answer: 'You can create a Next.js project with TypeScript by using the `--typescript` flag when setting up your project.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const contactMethods = [
    {
      title: 'Call',
      number: '08139362969',
      icon: <PiPhoneCall />
    },
    {
      title: 'Chat',
      number: '08139362969',
      icon: <IoChatboxEllipsesOutline />
    },
    {
      title: 'Video Call',
      number: '08139362969',
      icon: <IoVideocamOutline />
    },
    {
      title: 'Message',
      number: '08139362969',
      icon: <FaRegMessage />
    }
  ];

  const router = useRouter()

  const announcement = ["I can be a React component, multiple React components, or just some text.", "I can be a React component, multiple React components, or just some text.", "I can be a React component, multiple React components, or just some text.", "I can be a React component, multiple React components, or just some text."]



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
                  <PiDotDuotone className='text-[20px] text-white'/>
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
            delay: 2500,
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
                    <p className='md:text-[50px] text-[30px] fonnt-bold'>
                      {content.heroText}
                    </p>
                    <p className='text-[18px]'>
                      {content.servicesText}
                    </p>
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

      <div className='bg-[#FF0200] flex items-center py-2'>
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
      </div>

      <section>
        <div className='mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto flex items-center justify-between'>
          <div className='text-left w-[70%]'>
            <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>Newly Posted Jobs</p>
            <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
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
          <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
        </div>
        <div className='flex items-center justify-between flex-col md:flex-row md:w-[85%] w-[95%] mx-auto mt-8 gap-5'>
          <img src="./images/School-Kids-scaled.jpg" alt="" className='md:w-[450px] w-full rounded-[12px]' />
          <div className='grid gap-7'>
            <div>
              <p className='font-bold text-[18px]'>Title</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident neque accusantium nemo quod incidunt!</p>
            </div>
            <div>
              <p className='font-bold text-[18px]'>Title</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident neque accusantium nemo quod incidunt!</p>
            </div>
            <div>
              <p className='font-bold text-[18px]'>Title</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident neque accusantium nemo quod incidunt!</p>
            </div>
          </div>
        </div>
      </section>
      {/* bg-gradient-to-r from-[#8b2e2e] to-[#FF0200] h-64 */}
      <section className='w-[100%] mx-auto mt-[6rem] bg-video flex flex-col items-center justify-center'>
        <div className="text-center flex flex-col items-center justify-center text-white mt-[60px]">
          <p className="font-[600] md:text-[30px] text-[20px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <button className="py-[10px] px-[20px] bg-[#FF0200] mt-[3rem] rounded-[8px]" onClick={() => router.push('/sign-up')}>Get Started</button>
        </div>
      </section>

      <section>
        <div className='text-left mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto'>
          <p className='md:text-[35px] text-[20px] font-[600] mb-[-1px] text-[#FF0200]'>Our Services</p>
          <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
        </div>
        <div className='grid md:grid-cols-3 gap-4 w-[85%] mx-auto mt-8'>
          <ServicesCard />
        </div>
      </section>

      <section>
        <div className='mt-[5rem] mb-4 md:w-[85%] w-[95%] mx-auto flex items-center justify-between'>
          <div className='text-left w-[60%]'>
            <p className='md:text-[35px] text-[20px] font-[600] md:mb-[-1px] mb-2 text-[#FF0200]'>Latest Blogs</p>
            <p className='text-gray-500 md:text-[15px] text-[12px] leading-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
          </div>
          {/* <button className='text-[12px] border rounded-full md:px-4 px-2 py-2 md:w-[120px] w-[110px]' onClick={() => router.push('/blog/post-blog')}>Create a blog</button> */}
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-2 gap-4 md:w-[85%] w-[95%] mx-auto mt-8'>
          <BlogComponent  />
        </div>
        <div className='flex items-center justify-center mt-9'>
          <button className='text-[12px] border rounded-full px-4 py-2 flex items-center gap-4' onClick={() => router.push('/blog')}>
            <p>View All Blogs</p>
            <IoIosArrowRoundForward />
          </button>
        </div>
      </section>

      <section className='w-[100%] mx-auto mt-[6rem] bg-video flex flex-col items-center justify-center'>
        <div className="text-center flex flex-col items-center justify-center text-white mt-[60px]">
          <p className="font-[600] md:text-[30px] text-[20px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </p>
          <button onClick={() => router.push('/sign-up')} className="py-[10px] px-[20px] bg-[#FF0200] mt-[3rem] rounded-[8px]">Get Started</button>
        </div>
      </section>
      
      <section className="mt-[9rem] mb-[5rem]">
        <div className="text-center mb-5">
          <p className="text-[#212121] font-bold md:text-[30px] text-[20px]">Frequently Asked Questions</p>
          <p className="text-[#777575] text-[14px] md:text-[16px]">Got Questions? We&apos;ve Got Answers!</p>
        </div>
        <div className="max-w-3xl mx-auto p-4">
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
                <p className="py-2 text-[#212121] text-[14px] md:text-[16px]">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="md:max-w-[1600px] w-[95%] mx-auto lg:px-[2rem] flex items-start">
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
                    <button className="w-full py-3 bg-[#ffeded] text-[#121212] rounded-lg hover:bg-red-100 transition-colors">
                      Call Now
                    </button>
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
      </section>

      <Footer />
    </div>
  );
}
