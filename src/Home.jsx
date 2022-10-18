import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import LoadingBar from 'react-top-loading-bar';
import AOS from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Testimonial_Swiper from './Testimonial_Swiper';
import ReactHtmlParser from 'react-html-parser';
import News from './News';
const Home = () => {
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState();
    const [optionalData, setOptionalData] = useState();
    const [fcourse, setFcourse] = useState();
    const [pcourse, setPcourse] = useState();
    const massage = useLocation();
    const d = new Date();
    const redi = useNavigate();
    useEffect(() => {
        AOS.init();
        setProgress(100);
        getData();
    }, []);

    const getData = async () => {
        if (localStorage.getItem("jwt")) {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then((res) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
        else {
            setData('');
        }
        await axios.get(`${process.env.REACT_APP_BASE_URL}/free_course/`)
            .then((res) => {
                setFcourse(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        await axios.get(`${process.env.REACT_APP_BASE_URL}/paid_course/`)
            .then((res) => {
                setPcourse(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        await axios.get(`${process.env.REACT_APP_BASE_URL}/getBYid/optionalData`)
            .then((res) => {
                setOptionalData(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
        if (massage.state) {
            toast.success(massage.state, {
                toastId: 'success1',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            redi(massage.pathname, { replace: true });
        }
    }

    const navHandle = () => {
        if (nav === 'left-[-1000px]') {
            setNav('left-[0px]');
            setPosition('fixed');
        }
        else {
            setNav('left-[-1000px]');
            setPosition();
        }
    }
    const logout = () => {
        localStorage.removeItem("jwt");
        getData();
    }
    return (
        <>
            <LoadingBar
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                waitingTime={1000}
                loaderSpeed={1000}
                height={5}
                shadow={true}
                color="#207daf"
            />
            {nav === 'left-[-1000px]' ? <HiMenu className='text-3xl absolute right-2 top-2 z-50 lg:invisible' onClick={navHandle} /> : <MdClose className='text-3xl fixed right-2 top-2 z-50 lg:invisible' onClick={navHandle} />}
            <div className={`absolute ${nav} lg:sticky lg:top-0 h-full bg-white w-full z-40 duration-700`}>
                <div className="space-y-4 lg:items-center lg:relative flex flex-col lg:flex-row lg:justify-between lg:h-[83px] lg:border-b-2 lg:p-5 h-full  bg-white w-full shadow-lg">
                    <div className="lg:text-xl text-[#207daf] text-center py-3 text-3xl font-bold">AlgoBot048</div>
                    <div className="text-xl flex flex-col lg:flex-row space-y-2 lg:space-y-0">
                        <div className="flex flex-col items-center lg:justify-around lg:flex-row lg:space-x-2 space-y-4 lg:space-y-0">
                            {data ? <h1 className='font-bold text-center w-full lg:w-fit text-[#207daf]'>Hi {data.userName}</h1> : <Link to={'/login'} className='bg-[#207daf] px-2 text-center text-white font-medium h-9 w-full lg:w-fit flex flex-row items-center rounded-lg cursor-pointer hover:bg-[#0b5076] justify-center'>Login</Link>}
                            {data && data.status === "admin" ? (<NavLink to={'/manage'} className='bg-[#207daf] px-2 text-white font-medium h-9 w-full lg:w-fit flex flex-row justify-center items-center rounded-lg cursor-pointer hover:bg-[#0b5076]'>Manage</NavLink>) : null}
                            {data ? (<button onClick={logout} className='bg-[#207daf] px-2 text-white font-medium h-9 flex flex-row justify-center w-full lg:w-fit items-center rounded-lg cursor-pointer hover:bg-[#0b5076]'>Log Out</button>) : (<Link to={'/signUp'} className='bg-[#207daf] px-2 text-center text-white font-medium w-full lg:w-fit h-9 flex flex-row justify-center items-center rounded-lg cursor-pointer hover:bg-[#0b5076]'>Sign UP</Link>)}
                        </div></div>
                </div>
                {/* <div className="lg:h-[50px] absolute lg:relative lg:top-0 top-[-100px] shadow-lg invisible lg:visible lg:items-center flex flex-col lg:flex-row lg:justify-between lg:p-5">
                    <AiFillHome className='text-[#207daf] text-2xl' />
                    <ul className='flex flex-col lg:flex-row lg:space-x-5'>
                        <li className='text-[16px] text-[#207daf] uppercase font-medium'>java</li>
                        <li className='text-[16px] text-[#207daf] uppercase font-medium'>java</li>
                        <li className='text-[16px] text-[#207daf] uppercase font-medium'>java</li>
                        <li className='text-[16px] text-[#207daf] uppercase font-medium'>java</li>
                        <li className='text-[16px] text-[#207daf] uppercase font-medium'>java</li>
                    </ul>
                    <BiSearch className='text-[#207daf] text-2xl' />
                </div> */}
            </div>
            <div className="div_2 content h-fit items-center flex flex-row justify-between bg-[url('./feather.png')] bg-repeat">
                <img src="img/cover.png" className='invisible lg:visible lg:relative lg:left-0 absolute left-[-1000px] w-[600px] h-[386px]' alt="" />
                <div className="mx-8 text-center w-full ">
                    <div data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="1000" data-aos-delay="1000" className='text-[36px] text-center font-bold lg:w-[600px]'>Welcome to AlgoBot</div>
                    <div className="text-[16px] lg:w-full text-center lg:text-justify">{ReactHtmlParser(optionalData && optionalData.welcomeData)}</div>
                </div>
            </div>
            <News />
            <div className={`${position} px-6 py-8 z-30`}>
                <div className="w-full text-center text-[30px] font-medium py-4">Free Course</div>
                <div className="flex justify-center flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                    {fcourse ? fcourse.map((value, index) => {
                        return (
                            <div key={index} className="p-4 md:w-1/3 sm:mb-0 mb-6 hover:shadow-2xl rounded-lg shadow-lg">
                                <div className="rounded-lg h-64 overflow-hidden">
                                    <img alt="content" className="object-cover object-center h-full w-full" src={`${process.env.REACT_APP_BASE_URL}/course_pic/${value.img}`} />
                                </div>
                                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{value.title}</h2>
                                <p className="text-base leading-relaxed mt-2">youtube</p>
                                <a href={value.url} className="text-white px-2 rounded-md bg-[#207daf] inline-flex items-center mt-3">Start Watching
                                </a>
                            </div>
                        )
                    }) : <img src="./img/loading.gif" alt='img' />}
                </div>
            </div>

            <div className={`${position} px-6 py-8 z-30`}>
                <div className="w-full text-center text-[30px] font-medium py-4">Paid Course</div>
                <div className="flex justify-center flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
                    {pcourse ? pcourse.map((value, index) => {
                        return (
                            <div key={index} className="p-4 md:w-1/3 sm:mb-0 mb-6 hover:shadow-2xl rounded-lg">
                                <div className="rounded-lg h-64 overflow-hidden">
                                    <img alt="content" className="object-cover object-center h-full w-full" src={`${process.env.REACT_APP_BASE_URL}/course_pic/${value.img}`} />
                                </div>
                                <h2 className="text-xl font-medium title-font text-gray-900 mt-5">{value.title}</h2>
                                <p className="text-base leading-relaxed mt-2">{value.price} Tk</p>
                                {data ? <Link to={`/paid_course/${value._id}`} className="text-white px-2 rounded-md bg-[#207daf] inline-flex items-center mt-3">Join
                                </Link> : <button onClick={() => {
                                    alert('Please SignUp or Login')
                                }} className="text-white px-2 rounded-md bg-[#207daf] inline-flex items-center mt-3">Join
                                </button>}
                            </div>
                        )
                    }) : <img src="./img/loading.gif" alt='img' />}
                </div>
            </div>

            <section className={`${position} text-gray-600 body-font`}>
                <div className="container px-5 py-24 mx-auto">
                    <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
                        Testimonials
                    </h1>
                    <div className="w-full">
                        <Testimonial_Swiper />
                    </div>

                </div>
            </section>
            <div className={`${position} bg-gray-100 z-20`}>
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <a href='/' className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <img src="img/dpcurrent.jpg" className="w-16 h-16 text-white p-2 rounded-full" alt="" />
                        <span className="ml-3 text-xl">AlgoBot048</span>
                    </a>
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
                        © {d.getFullYear()} —
                        <a
                            href="https://twitter.com/knyttneve"
                            rel="noopener noreferrer"
                            className="text-gray-600 ml-1"
                            target="_blank"
                        >
                            @AlgoBot048
                        </a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-3">
                        <a href='https://www.facebook.com/groups/814583202628887/' className="text-gray-500">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a href=' https://discord.gg/8Xf833jJhm' className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-discord" viewBox="0 0 16 16"> <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" /> </svg>
                        </a>
                    </span>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Home 