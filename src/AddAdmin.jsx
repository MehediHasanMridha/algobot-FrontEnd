import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useFormik } from "formik";
import { addAdminSchema } from "./schemas";


const AddAdmin = () => {
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState();
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const redi = useNavigate();
    useEffect(() => {
        setProgress(100);
    }, []);

    const initialValues = {
        full_name: "",
        email: "",
        password: ""
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: addAdminSchema,
        onSubmit: async(values, action) => {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/manage/addAdmin`, values)
                .then((res) => {
                    redi('/manage/admin', { state: res.data });
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
        <>
            <LoadingBar
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
                        Admin
                    </div>
                    <form onSubmit={handleSubmit} className="w-[60%] mx-auto">
                        <div className="relative mb-4">
                            <label htmlFor="full_name" className="leading-7 text-sm text-black">Full Name</label>
                            <input value={values.full_name}
                                onChange={handleChange}
                                onBlur={handleBlur} type="text" id="full_name" name="full_name" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.full_name && touched.full_name ? (
                                <p className="text-red-600">{errors.full_name}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-black">Email</label>
                            <input value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.email && touched.email ? (
                                <p className="text-red-600">{errors.email}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="Password" className="leading-7 text-sm text-black">Password</label>
                            <input value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} type="password" id="Password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.password && touched.password ? (
                                <p className="text-red-600">{errors.password}</p>
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

export default AddAdmin