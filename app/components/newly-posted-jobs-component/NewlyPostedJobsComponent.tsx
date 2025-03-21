// import ProductCard from "../productCard/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"

import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowBackIos } from "react-icons/md";
import NewlyPostedJobsCards from "../newly-posted-jobs-cards/NewlyPostedJobsCards";
import { CustomArrowProps } from "react-slick";

const NewlyPostedJobsComponent = () => {

    const newlyPostedJobs =[
        {
            image: "./images/School-Kids-scaled.jpg",
            jobTitle: "Teacher's Assistant Position",
            link: "/",
            salaryRange: "N10,000 - N15,000 per month"
        },
        {
            image: "./images/School-Kids-scaled.jpg",
            jobTitle: "Headmaster Position",
            link: "/",
            salaryRange: "N10,000 - N15,000 per month"
        },
        {
            image: "./images/School-Kids-scaled.jpg",
            jobTitle: "Principal Position",
            link: "/",
            salaryRange: "N10,000 - N15,000 per month"
        },
        {
            image: "./images/School-Kids-scaled.jpg",
            jobTitle: "Principal Position",
            link: "/",
            salaryRange: "N10,000 - N15,000 per month"
        },
        {
            image: "./images/School-Kids-scaled.jpg",
            jobTitle: "Principal Position",
            link: "/",
            salaryRange: "N10,000 - N15,000 per month"
        }
    ]

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


    return (
        <Slider {...settings}>
            {newlyPostedJobs?.map((job, index) => (
                <NewlyPostedJobsCards job={job} key={index}/>
            ))}
        </Slider>
    )
}

export default NewlyPostedJobsComponent