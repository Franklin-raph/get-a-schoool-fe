"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import NewlyPostedJobsCards from "../newly-posted-jobs-cards/NewlyPostedJobsCards";
import { CustomArrowProps } from "react-slick";
import { useEffect, useState } from "react";
import { get } from "@/app/utils/axiosHelpers";

// Define a type for your job posts
interface JobPost {
    id?: number;
    location?: string;
    description?: string;
    salary_lower_range?: number;
    salary_upper_range?: number;
    // Add other properties as needed
}

const NewlyPostedJobsComponent = () => {


    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAllJobs = async () => {
        try {
            setIsLoading(true);
            const response = await get('/job-posts/');
            const jobsData = response.results || response;

            console.log({response, jobsData});
            
            setJobs(jobsData);
            setIsLoading(false);
        } catch (err) {
            setError('Hello, We are currently unable to display any job postings due to a system upgrade; please be patient. Because our developers are already working on resolving this issue, we would appreciate your patience. You can always check back later. Thank you. ');
            setIsLoading(false);
            console.error(err);
        }
    }

    useEffect(() => {
        getAllJobs();
    }, [])

    const SampleNextArrow = (props: CustomArrowProps) => {
        const { onClick } = props;
        return(
            <div onClick={onClick} >
            <IoIosArrowForward className="custom-arrow-next" style={{color:"black"}}/>
            </div>
        )
    }
    
    function SamplePrevArrow(props: CustomArrowProps) {
        const { onClick } = props;
        return(
            <div onClick={onClick} >
            <MdOutlineArrowBackIos className="custom-arrow-prev" style={{color:"black"}}/>
            </div>
        )
    }

    const settings = {
        dots: false,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: false,
        autoplaySpeed: 1000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
            }
            }
        ]
    };

    // Render loading state
    if (isLoading) {
        return <div>Loading jobs...</div>
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>
    }

    // Render empty state if no jobs
    if (jobs.length === 0) {
        return <div>No jobs found</div>
    }

    return (
        <Slider {...settings}>
            {jobs?.map((job, index) => (
                <NewlyPostedJobsCards job={job} key={job.id || index}/>
            ))}
        </Slider>
    )
}

export default NewlyPostedJobsComponent