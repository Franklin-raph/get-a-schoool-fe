"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';
import { TbCurrencyNaira } from 'react-icons/tb';
import Navbar from './components/nav-bar/Navbar';


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
                    <p className='text-[50px] fonnt-bold'>
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
        <p className='text-[35px] text-center mt-[5rem] mb-5'>Our Services</p>
        <div className='grid grid-cols-3 gap-4 w-[85%] mx-auto'>
          <div className='text-center border rounded-[15px] shadow-xl py-8'>
            <img src="./images/get-hired-by-a-school.jpg" alt="" className='w-[150px] h-[150px] rounded-full mx-auto object-cover'/>
            <p className='mt-3'>Get Hired By A School.</p>
          </div>
          <div className='text-center border rounded-[15px] shadow-xl py-8'>
            <img src="./images/get-hired-by-a-school.jpg" alt="" className='w-[150px] h-[150px] rounded-full mx-auto object-cover'/>
            <p className='mt-3'>Hire a staff now.</p>
          </div>
          <div className='text-center border rounded-[15px] shadow-xl py-8'>
            <img src="./images/Study-Office-Administration.jpg" alt="" className='w-[150px] h-[150px] rounded-full mx-auto object-cover'/>
            <p className='mt-3'>Schedule a seminar for your staff</p>
          </div>
        </div>
      </section>
    </div>
  );
}
