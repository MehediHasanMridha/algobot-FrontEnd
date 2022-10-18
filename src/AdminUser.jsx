import React, { useEffect, useState } from 'react';
import { Link , useLocation,useNavigate} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Admin_layout from './Admin_layout';
import { HiMenu } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

const AdminUser = () => {
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState([]);
    const massage = useLocation();
    const redi = useNavigate();
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    useEffect(() => {
        setProgress(100);
        getData();
    }, [itemOffset, itemsPerPage]);
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
    if (massage.state) {
        toast.success(massage.state.add, {
            toastId: 'success1',
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/manage/`)
            .then((res) => {
                setData(res.data);
                const endOffset = itemOffset + itemsPerPage;
                setCurrentItems(res.data.slice(itemOffset, endOffset));
                setPageCount(Math.ceil(res.data.length / itemsPerPage));
            })
            .catch((err) => {
                console.log(err)
            });
    }
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        setItemOffset(newOffset);
    };
    const delete_data = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/manage/${id}`).then((res) => {
            toast.success(res.data, {
                toastId: 'success1',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            getData();
        });
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
                <div className={`${position} w-full lg:w-[80%] bg-gray-400 text-center relative`}>
                    <div className="text-2xl flex flex-row justify-center bg-[#207daf] p-5">
                        <Link to={'add'} className="bg-[#0032FF] px-2 rounded-lg">Add</Link>
                        <div className="w-[80%]">Admin</div>
                    </div>
                    <div className="overflow-x-auto relative shadow-md">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Email
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems && currentItems.map((value, index) => {
                                    return (value.status === 'admin' ?
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {value.userName}
                                            </th>
                                            <td className="py-4 px-6">
                                                {value.email}
                                            </td>
                                            <td className="py-4 px-6 space-x-4">
                                                <Link to={`edit/${value._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <button onClick={() => {
                                                        // eslint-disable-next-line no-restricted-globals
                                                        const ans = confirm("Are you sure you want to delete");
                                                        if (ans === true) {
                                                            delete_data(value._id);
                                                        }
                                                    }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Delete </button>
                                            </td>
                                        </tr> : null)
                                })}
                            </tbody>
                        </table>
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

export default AdminUser