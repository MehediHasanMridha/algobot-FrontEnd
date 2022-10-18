import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from "formik";
import { pregiSchema } from "./schemas";

const PaidRegiForm = () => {
    const { id } = useParams();
    const [fdata, setFdata] = useState();
    const redi = useNavigate();
    useEffect(() => {
        getData();
    }, []);

    const initialValues = {
        name: "",
        Email: "",
        phone: "",
        transId: "",
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: pregiSchema,
        onSubmit: async(values, action) => {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/paidRegi/`, { ...values, title: fdata,promoCode: localStorage.getItem("promo") })
                .then((res) => {
                    localStorage.removeItem('promo');
                    redi('/', { state: res.data });
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

    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/paid_course/${id}`)
            .then((res) => {
                setFdata(res.data.title);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    return (
        <>
            <div className="bg-white py-6 sm:py-8 lg:py-12">
                <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                    {/* text - start */}
                    <div className="mb-10 md:mb-16">
                        <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">Registration Form</h2>
                    </div>
                    {/* text - end */}
                    {/* form - start */}
                    <form onSubmit={handleSubmit} className="max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Your Name</label>
                            <input name="name" value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur} className="w-full bg-gray-50 text-gray-800 border focus:ring ring-[#2cb1f8] rounded outline-none transition duration-100 px-3 py-2" />
                            {errors.name && touched.name ? (
                                <p className="text-red-600">{errors.name}</p>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Email</label>
                            <input name="Email" value={values.Email}
                                onChange={handleChange}
                                onBlur={handleBlur} className="w-full bg-gray-50 text-gray-800 border focus:ring ring-[#2cb1f8] rounded outline-none transition duration-100 px-3 py-2" />
                            {errors.Email && touched.Email ? (
                                <p className="text-red-600">{errors.Email}</p>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Phone Number</label>
                            <input name="phone" type={"tel"} value={values.phone}
                                onChange={handleChange}
                                onBlur={handleBlur} className="w-full bg-gray-50 text-gray-800 border focus:ring ring-[#2cb1f8] rounded outline-none transition duration-100 px-3 py-2" />
                            {errors.phone && touched.phone ? (
                                <p className="text-red-600">{errors.phone}</p>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="transId" className="inline-block text-gray-800 text-sm sm:text-base mb-2">Trans ID (Bkash)</label>
                            <input name="transId" value={values.transId}
                                onChange={handleChange}
                                onBlur={handleBlur} className="w-full bg-gray-50 text-gray-800 border focus:ring ring-[#2cb1f8] rounded outline-none transition duration-100 px-3 py-2" />
                            {errors.transId && touched.transId ? (
                                <p className="text-red-600">{errors.transId}</p>
                            ) : null}
                        </div>
                        <div className="sm:col-span-2 flex justify-between items-center">
                            <button type='submit' className="inline-block bg-[#2cb1f8] hover:bg-[#207daf] active:bg-[#207daf] focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">Send</button>
                        </div>
                    </form>
                    {/* form - end */}
                </div>
            </div>

        </>
    )
}

export default PaidRegiForm