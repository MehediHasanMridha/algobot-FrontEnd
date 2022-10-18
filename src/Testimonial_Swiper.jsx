import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ReactHtmlParser from 'react-html-parser';


const Testimonial_Swiper = () => {
    const [testimonial, setTestimonial] = useState();
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none"}}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "none"}}
                onClick={onClick}
            />
        );
    }
    const settings = {
        // arrows: true,
        // dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: true,
                }
            }
        ]
    };
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/testimonial/gettestimonial`)
            .then((res) => {
                setTestimonial(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    return (
        <>
            <Slider {...settings}>
                {testimonial ? testimonial.map((value, index) => {
                    return (
                        <div className="p-4 w-full" key={index}>
                            <div className="h-full bg-gray-100 p-8 rounded">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="block w-5 h-5 text-gray-400 mb-4"
                                    viewBox="0 0 975.036 975.036"
                                >
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                                </svg>
                                <p className="leading-relaxed mb-6">
                                    {ReactHtmlParser(value.des)}
                                </p>
                                <a href='/' className="inline-flex items-center">
                                    <img
                                        alt="testimonial"
                                        src={`${process.env.REACT_APP_BASE_URL}/course_pic/${value.img}`}
                                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                                    />
                                    <span className="flex-grow flex flex-col pl-4">
                                        <span className="title-font font-medium text-gray-900">
                                            {value.author}
                                        </span>
                                        <span className="text-gray-500 text-sm">{value.profession}</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    )
                }) : <img src="./img/loading.gif" alt='img' />}
            </Slider>
        </>
    )
}

export default Testimonial_Swiper