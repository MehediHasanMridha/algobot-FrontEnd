import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PaidCourseDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [promo, setPromo] = useState('');
    const [price, setPrice] = useState(null);
    const [css, setCss] = useState(null);
    const [optionalData, setOptionalData] = useState();
    const [promoContainer, setPromoContainer] = useState(null);
    const redi = useNavigate();
    useEffect(() => {
        localStorage.setItem("promo", null);
        getData();
    }, [])
    const handle = (e) => {
        setPromo(e.target.value);
    }
    const checkPromo = () => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/check/promoCode/`, { promoCode: promo })
            .then((res) => {
                if (res.data.tk) {
                    setPrice(data.price - res.data.tk);
                    toast.success("Congratulation " + res.data.tk + "TK discount", {
                        toastId: 'success1',
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setCss("invisible");
                    localStorage.setItem("promo", promo);
                }
                else {
                    setPrice(null);
                    toast.error(res.data, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const getData = async() => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/paid_course/${id}`)
            .then((res) => {
                setData(res.data);
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

    }
    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <div>
                            <div className="h-64 md:h-auto bg-gray-100 overflow-hidden rounded-lg shadow-lg">
                                {data ? <img src={`${process.env.REACT_APP_BASE_URL}/course_pic/${data.img}`} loading="lazy" alt="/" className="w-full h-full object-cover object-center" /> : <img src="./img/loading.gif" alt='img' />}
                            </div>
                        </div>
                        <div className="md:pt-8">
                            <h1 className="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6">Description</h1>
                            <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">
                                {data ? ReactHtmlParser(data.detail) : null}
                            </p>
                            <h2 className="text-gray-800 text-xl sm:text-2xl font-semibold text-center md:text-left mb-2 md:mb-4">Process</h2>
                            <p className="text-gray-500 sm:text-lg mb-6 md:mb-8">{ReactHtmlParser(optionalData&&optionalData.detail)}</p>
                            <h1 className="text-gray-800 text-2xl sm:text-3xl font-bold text-center md:text-left mb-4 md:mb-6">Price:{data && price === null ? data.price : price}Tk</h1>
                            <div className="mx-auto flex justify-between lg:justify-start w-[284px]lg:w-[340px]">
                                <Link to={'enroll'} className="flex items-center justify-center sm:flex-none bg-[#2cb1f8] hover:bg-[#207daf] active:bg-[#207daf] focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 lg:px-4 py-3 w-[100px] lg:w-[150px]">Enroll Now</Link>
                                <input type="text" name="promoCode" onChange={handle} id="" className="lg:py-3 border-2 border-[#207daf] focus:outline-none lg:mx-4 lg:px-2 w-[100px] lg:w-[150px]" placeholder='PromoCode' />
                                {promo.length === 0 ? null : <button onClick={checkPromo} className={`${css} flex items-center justify-center  bg-[#2cb1f8] hover:bg-[#207daf] active:bg-[#207daf] focus-visible:ring ring-indigo-300 text-white md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 lg:px-8 lg:py-3 w-[100px]`} >Submit</button>}
                            </div>
                        </div>
                    </div>
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

export default PaidCourseDetail