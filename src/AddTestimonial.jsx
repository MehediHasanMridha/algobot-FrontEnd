import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import { IconButton, LinearProgress } from '@mui/material/';
import { PhotoCamera } from "@material-ui/icons";
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { useFormik } from "formik";
import { Testimonial } from "./schemas";

const AddTestimonial = () => {
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState();
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();
    const [upload, setUpload] = useState(0);
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const redi = useNavigate();

    useEffect(() => {
        setProgress(100);
    }, []);
    

    const initialValues = {
        author: "",
        profession: "",
        img:""
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: Testimonial,
        onSubmit: async (values, action) => {
            const formData = new FormData();
            formData.append('author', values.author);
            formData.append('profession', values.profession);
            formData.append('des', data);
            formData.append('img', values.img);
            const config = {
                onUploadProgress: function (progressEvent) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUpload(percentCompleted);
                }
            }
            await axios.post(`${process.env.REACT_APP_BASE_URL}/manage/addtestimonial`, formData, config)
                .then((res) => {
                    redi('/manage/testimonial', { state: res.data });
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


    const ckdata = (event, editor) => {
        const des = editor.getData();
        setData(des);
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
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Add Testimonial</h2>
                        <div className="relative mb-4">
                            <label htmlFor="author" className="leading-7 text-sm text-gray-600">Author</label>
                            <input type="text" id="author" value={values.author}
                                onChange={handleChange}
                                onBlur={handleBlur} name="author" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.author && touched.author ? (
                                <p className="text-red-600">{errors.author}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="profession" className="leading-7 text-sm text-gray-600">Profession</label>
                            <input type="text" id="profession" value={values.Full_name}
                                onChange={handleChange}
                                onBlur={handleBlur} name="profession" min={0} className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            {errors.profession && touched.profession ? (
                                <p className="text-red-600">{errors.profession}</p>
                            ) : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
                            <CKEditor
                                editor={Editor}
                                data=""
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={ckdata}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="img" className="leading-7 text-sm text-gray-600"> Select Image</label>
                            <IconButton className='text-[#075c8a]' size="large" aria-label="upload picture" component="label">
                                <input type="file" hidden id="img" onChange={(e) => {
                                    setFieldValue("img", e.target.files[0]);
                                    setPreview(URL.createObjectURL(e.target.files[0]));
                                    e.target.value = null;
                                }}
                                    onBlur={handleBlur} name="img" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <PhotoCamera />
                            </IconButton>
                            {errors.img && touched.img ? (
                                <p className="text-red-600">{errors.img}</p>
                            ) : null}
                            {
                                preview ? <img src={preview} className="h-[200px] w-[200px]" alt="img" /> : null
                            }

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

export default AddTestimonial