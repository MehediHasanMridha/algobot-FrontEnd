import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import { IconButton, LinearProgress } from '@mui/material/';
import { PhotoCamera } from "@material-ui/icons";
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useFormik } from "formik";
import { addFreeCourseSchema } from "./schemas";

const AddFreeCourse = () => {
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState();
    const [preview, setPreview] = useState("");
    const [upload, setUpload] = useState(0);
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const redi = useNavigate();

    const initialValues = {
        title: "",
        url: "",
        img: ""
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: addFreeCourseSchema,
        onSubmit: async (values, action) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('url', values.url);
            formData.append('img', values.img);
            const config = {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUpload(percentCompleted);
                }
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/manage/free_course`, formData, config)
                .then((res) => {
                    redi('/manage/free_course/', { state: res.data });
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
            setPreview(null);
            
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
                <form onSubmit={handleSubmit} encType='multipart/form-data' className={`${position} w-full`}>
                    <div className="lg:w-[100%] md:w-full bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Add Free Course</h2>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                            <input type="text" id="title" value={values.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="title" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.title && touched.title ? (
                                <p className="text-red-600">{errors.title}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="url" className="leading-7 text-sm text-gray-600">Link</label>
                            <input type="url" id="url" value={values.url}
                                onChange={handleChange}
                                onBlur={handleBlur} name="url" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.url && touched.url ? (
                                <p className="text-red-600">{errors.url}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="img" className="leading-7 text-sm text-gray-600"> Select Image</label>
                            <IconButton className='text-[#075c8a]' size="large" aria-label="upload picture" component="label">
                                <input type="file" hidden id="img"
                                    onChange={(e) => {
                                        setFieldValue("img", e.target.files[0]);
                                        setPreview(URL.createObjectURL(e.target.files[0]));
                                        e.target.value = null;
                                    }}
                                    onBlur={handleBlur} name="img" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <PhotoCamera />
                            </IconButton>
                            {
                                preview ? <img src={preview} className="h-[200px] w-[200px]" alt="img" /> : null
                            }
                            {errors.img && touched.img ? (
                                <p className="text-red-600">{errors.img}</p>
                            ) : null}
                        </div>
                        {(upload && upload > 0 && upload < 100) ? <div className='w-full p-3 rounded-md flex-col justify-center bg-[#F3F4F6] mt-2'>
                            <LinearProgress className='w-[100%] text-[#075c8a] bg-[#075c8a]' variant="determinate" value={upload} />
                            {upload}%
                        </div> : null}
                        {(upload && upload > 0 && upload < 100) ? null : <input type="submit" className="text-white bg-[#075c8a] border-0 py-2 px-8 cursor-pointer focus:outline-none hover:bg-[#1c9de3] rounded text-lg" value="Add" />}
                    </div>
                </form>
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

export default AddFreeCourse