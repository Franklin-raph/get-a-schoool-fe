import React from 'react'

interface Services {
    image: string,
    title: string,
    link: string
}

const services: Services[] = [
    {
        image: "./images/get-hired-by-a-school.jpg",
        title: "Get Hired By A School",
        link: "/"
    },
    {
        image: "./images/hire-staff.jpeg",
        title: "Hire a Staff Now",
        link: "/"
    },
    {
        image: "./images/study-office-administration.jpg",
        title: "Schedule a Seminar for Your Staff",
        link: "/"
    }
]

export default function ServicesCard( ) {
  return (
    <>
        {
            services.map((service, index) => (
                // <div key={index} className='grid grid-cols-3 gap-4 w-[85%] mx-auto'>
                    <div key={index} className='text-center border rounded-[15px] shadow-xl py-8 hover:translate-y-[-15px] transition-all cursor-pointer'>
                        <img src={service.image} alt="" className='w-[150px] h-[150px] rounded-full mx-auto object-cover'/>
                        <p className='mt-5 font-[500]'>{service.title}</p>
                    </div>
                // </div>
            ))
        }
    </>
  )
}
