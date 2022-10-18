import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
const Admin_layout = ({menu}) => {
    const redi = useNavigate();
    const active = 'bg-[#1912e3] rounded-lg px-2';
    const [nav, setNav] = useState('left-[-1000px]');
    const [position, setPosition] = useState();
    const logout = () => {
        localStorage.removeItem("jwt");
        redi('/');
    }
    return (
        <>
            <div className={`${menu} duration-700 lg:left-0 absolute w-full z-30 lg:relative lg:w-[20%] bg-[#207daf] h-[100vh]`}>
                <div className="w-full text-center text-2xl font-bold p-5">Algobot048</div>
                <div className="bg-white w-full h-1"></div>
                <ul className='px-6 text-xl space-y-2'>
                    <li><NavLink className={({ isActive }) => isActive ? active : null} to={'/manage'} end>User</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active : null} to={'/manage/admin'}>Admin</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active : null} to={'/manage/free_course'}>Free Course</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active :null} to={'/manage/paid_course'}>Paid Course</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active :null} to={'/manage/paid_user'}>Paid User</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active :null} to={'/manage/promoCode'}>PromoCode</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active :null} to={'/manage/testimonial'}>Testimonial</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active : null} to={'/manage/optionalData'}>Optional Data</NavLink></li>
                    <li><NavLink className={({ isActive }) => isActive ? active :null} to={'/'} end>Home Page</NavLink></li>
                    <li className='cursor-pointer' onClick={logout}>LogOut</li>
                </ul>
            </div>

        </>
    )
}

export default Admin_layout 