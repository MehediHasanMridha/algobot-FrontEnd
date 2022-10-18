import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Admin_layout from './Admin_layout';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import LoadingBar from 'react-top-loading-bar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import { AddPromo } from "./schemas";

const AddPromoCode = () => {
    const [data, setData] = useState();
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const [progress, setProgress] = useState(0);
    const redi = useNavigate();

    useEffect(() => {
        setProgress(100);
    }, []);

    const initialValues = {
        promoCode: "",
        tk: "",
    };


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: AddPromo,
        onSubmit: (values, action) => {
            axios.post(`${process.env.REACT_APP_BASE_URL}/manage/addPromo`, values)
                .then((res) => {
                    redi('/manage/promoCode', { state: res.data });
                })
                .catch((err) => {
                    toast.error(err.response.data, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });
            action.resetForm();
        },
    });


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
    return (
        <><LoadingBar
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
            waitingTime={1000}
            loaderSpeed={1000}
            height={5}
            shadow={true}
            color="#075c8a"
        />
            <div className="flex flex-row">
                {nav === 'left-[-1000px]' ? <HiMenu className='text-3xl absolute right-2 top-2 z-50 lg:invisible' onClick={navHandle} /> : <MdClose className='text-3xl fixed right-2 top-2 z-50 lg:invisible' onClick={navHandle} />}
                <Admin_layout menu={nav} />
                <div className={`${position} w-full lg:w-[80%] bg-gray-400 text-center`}>
                    <div className="text-2xl flex flex-row justify-center bg-[#207daf] p-5">
                        PromoCode
                    </div>
                    <form onSubmit={handleSubmit} className="w-[60%] mx-auto">
                        <div className="relative mb-4">
                            <label htmlFor="promoCode" className="leading-7 text-sm text-black">PromoCode</label>
                            <input value={values.promoCode}
                                onChange={handleChange}
                                onBlur={handleBlur} type="text" id="promoCode" name="promoCode" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.promoCode && touched.promoCode ? (
                                <p className="text-red-600">{errors.promoCode}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="tk" className="leading-7 text-sm text-black">Tk</label>
                            <input value={values.tk}
                                onChange={handleChange}
                                onBlur={handleBlur} min='0' type="number" id="tk" name="tk" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.tk && touched.tk ? (
                                <p className="text-red-600">{errors.tk}</p>
                            ) : null}
                        </div>
                        <button type='submit' className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">Add</button>
                    </form>
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

export default AddPromoCode