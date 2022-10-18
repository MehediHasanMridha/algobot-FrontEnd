import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { IconButton, LinearProgress } from '@mui/material/';
import { PhotoCamera } from "@material-ui/icons";
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';

const EditOptionalData = () => {
    const { id } = useParams();
    const [progress, setProgress] = useState(0);
    const [news, setNews] = useState();
    const [detail, setDetail] = useState();
    const [data, setData] = useState();
    const [welData, setWelData] = useState();
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const redi = useNavigate();

    useEffect(() => {
        setProgress(100);
        getData();
    }, []);

    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/optionalData/${id}`)
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${process.env.REACT_APP_BASE_URL}/edit/optionalData/${id}`, { ...data, detail: detail, news: news, welcomeData: welData })
            .then((res) => {
                redi('/manage/optionalData', { state: res.data });
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
    }
    const ckdata = (event, editor) => {
        const des = editor.getData();
        setDetail(des);
    }
    const newsData = (event, editor) => {
        const dese = editor.getData();
        setNews(dese);
    }
    const welcomeData = (event, editor) => {
        setWelData(editor.getData());
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
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Edit Optional Data</h2>
                        <div className="relative mb-4">
                            <label htmlFor="welcomeData" className="leading-7 text-sm text-gray-600">Welcome Data</label>
                            <CKEditor
                                editor={Editor}
                                data={data && data.welcomeData}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={welcomeData}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="details" className="leading-7 text-sm text-gray-600">Process</label>
                            <CKEditor
                                editor={Editor}
                                data={data && data.detail}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={ckdata}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="News" className="leading-7 text-sm text-gray-600">News</label>
                            <CKEditor
                                editor={Editor}
                                data={data && data.news}
                                onReady={editor => {
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);
                                }}
                                onChange={newsData}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                        <input type="submit" className="text-white bg-[#075c8a] border-0 py-2 px-8 cursor-pointer focus:outline-none hover:bg-[#1c9de3] rounded text-lg" value="Add" />
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

export default EditOptionalData