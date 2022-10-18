import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import { IconButton, LinearProgress } from '@mui/material/';
import { PhotoCamera } from "@material-ui/icons";
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const EditFreeCourse = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [fdata, setFdata] = useState();
    const [data, setData] = useState();
    const [preview, setPreview] = useState("");
    const [upload, setUpload] = useState(0);
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const redi = useNavigate();

    useEffect(() => {
        setProgress(100);
        getData();
    }, []);

    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/freeCourse/${id}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleFile = (e) => {
            setFdata({img: e.target.files[0] });
            setPreview(URL.createObjectURL(e.target.files[0]));
            getData();
            e.target.value = null;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        if (fdata === undefined) {
            formData.append('title', data.title);
            formData.append('url', data.url);
            
        }
        else {
            formData.append('title', data.title);
            formData.append('url', data.url);
            formData.append('img', fdata.img);
        }
        const config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUpload(percentCompleted);
            }
        }
        await axios.put(`${process.env.REACT_APP_BASE_URL}/update/free_course/${id}`, formData, config)
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
        setPreview(null);
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
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Edit Free Course</h2>
                        <div className="relative mb-4">
                            <label htmlFor="title" className="leading-7 text-sm text-gray-600">Title</label>
                            <input type="text" id="title" value={data && data.title}
                                onChange={handleChange}
                                name="title" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="url" className="leading-7 text-sm text-gray-600">Link</label>
                            <input type="url" id="url" value={data && data.url}
                                onChange={handleChange}
                                name="url" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="url" className="leading-7 text-sm text-gray-600">Current Image</label>
                            {data ? <img className='w-[500px] h-[300px]' src={`${process.env.REACT_APP_BASE_URL}/course_pic/${data.img}`} alt="" /> : null}
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="img" className="leading-7 text-sm text-gray-600"> Change Image</label>
                            <IconButton className='text-[#075c8a]' size="large" aria-label="upload picture" component="label">
                                <input type="file" hidden id="img"
                                    onChange={handleFile}
                                    name="img" className="w-full bg-white rounded border border-gray-300 focus:border-[#0b5076] focus:ring-2 focus:ring-[#69caff] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                <PhotoCamera />
                            </IconButton>
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

export default EditFreeCourse