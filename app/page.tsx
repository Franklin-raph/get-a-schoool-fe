"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiper } from 'swiper/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation'

// import required modules
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { TbCurrencyNaira } from 'react-icons/tb';
import Navbar from './components/nav-bar/Navbar';
import ServicesCard from './components/services-card/ServicesCard';
import Footer from './components/footer/Footer';
import NewlyPostedJobsCards from './components/newly-posted-jobs-cards/NewlyPostedJobsCards';
import { BiArrowFromRight, BiArrowToRight, BiChevronLeft, BiChevronRight, BiUser } from 'react-icons/bi';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import NewlyPostedJobsComponent from './components/newly-posteed-jobs-component/NewlyPostedJobsComponent';
import { BsClock } from 'react-icons/bs';
import BlogCard from './components/blog-card/BlogCard';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useRouter } from 'next/navigation';

// import { ChevronLeft, ChevronRight } from 'react-icons/lucide-react'


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

  const blogArray = [
    {
      image: "./images/hire-staff.jpeg",
      title: "School Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus nec pulvinar facilisis, mauris ligula ultricies velit, at consectetur risus ligula sed neque. Donec convallis orci et nisi semper, vel posuere lectus faucibus.",
      author: "John Doe",
      date: "2022-12-12"
    },
    {
      image: "./images/child-girl-schoolgirl-elementary-school-student-123686003.webp",
      title: "School Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus nec pulvinar facilisis, mauris ligula ultricies velit, at consectetur risus ligula sed neque. Donec convallis orci et nisi semper, vel posuere lectus faucibus.",
      author: "John Doe",
      date: "2025-01-12"
    },
    {
      image: "./images/Study-Office-Administration.jpg",
      title: "School Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus nec pulvinar facilisis, mauris ligula ultricies velit, at consectetur risus ligula sed neque. Donec convallis orci et nisi semper, vel posuere lectus faucibus.",
      author: "John Doe",
      date: "2023-12-12"
    },
    {
      image: "./images/School-Kids-scaled.jpg",
      title: "School Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus nec pulvinar facilisis, mauris ligula ultricies velit, at consectetur risus ligula sed neque. Donec convallis orci et nisi semper, vel posuere lectus faucibus.",
      author: "John Doe",
      date: "2024-12-12"
    },
    {
      image: "./images/School-Kids-scaled.jpg",
      title: "School Life",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus nec pulvinar facilisis, mauris ligula ultricies velit, at consectetur risus ligula sed neque. Donec convallis orci et nisi semper, vel posuere lectus faucibus.",
      author: "John Doe",
      date: "2023-2-12"
    }
  ]

  const router = useRouter()

  return (
    <div>
      <Navbar />
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
              <div className='mb-5 shadow-md rounded-[20px] relative h-full'>
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

      <section>
        <div className='mt-[5rem] mb-4 w-[85%] mx-auto flex items-center justify-between'>
          <div className='text-left'>
            <p className='text-[35px] font-[600] mb-[-10px] text-[#FF0200]'>Newly Posted Jobs</p>
            <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
          </div>
          <button className='text-[12px] border rounded-full px-4 py-2'>View More</button>
        </div>

        <div className="relative w-[85%] mx-auto overflow-visible"> {/* Add padding to make room for arrows */}
          <NewlyPostedJobsComponent />
        </div>
      </section>

      <section>
        <div className='text-left mt-[5rem] mb-4 w-[85%] mx-auto'>
          <p className='text-[35px] font-[600] mb-[-10px] text-[#FF0200]'>About Us</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
        </div>
        <div className='flex items-center justify-between flex-col md:flex-row w-[85%] mx-auto mt-8 gap-5'>
          <img src="./images/School-Kids-scaled.jpg" alt="" className='w-[450px] rounded-[12px]' />
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
          <button className="py-[10px] px-[20px] bg-[#FF0200] mt-[3rem] rounded-[8px]">Get Started</button>
        </div>
      </section>

      <section>
        <div className='text-left mt-[5rem] mb-4 w-[85%] mx-auto'>
          <p className='text-[35px] font-[600] mb-[-10px] text-[#FF0200]'>Our Services</p>
          <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
        </div>
        <div className='grid md:grid-cols-3 gap-4 w-[85%] mx-auto mt-8'>
          <ServicesCard />
        </div>
      </section>

      <section>
        <div className='mt-[5rem] mb-4 w-[85%] mx-auto flex items-center justify-between'>
          <div className='text-left'>
            <p className='text-[35px] font-[600] mb-[-10px] text-[#FF0200]'>Latest Blogs</p>
            <p className='text-gray-500'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus, iusto! </p>
          </div>
          <button className='text-[12px] border rounded-full px-4 py-2'>Create a blog</button>
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 gap-2 w-[85%] mx-auto mt-8'>
          {
            blogArray.map((blog, index) => (
              <BlogCard blog={blog} key={index} />
            )).slice(0, 4)
          }
        </div>
        <div className='flex items-center justify-center mt-9'>
          <button className='text-[12px] border rounded-full px-4 py-2 flex items-center gap-4' onClick={() => router.push('/blog')}>
            <p>View All Blogs</p>
            <IoIosArrowRoundForward />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
