import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet} from "react-router-dom";
import Error404 from './Error404';
const PrivateRoute = () => {
    const[data,setData]=useState();
    useEffect(() => {
        getData();
    })
    const getData = async () => {
        if (localStorage.getItem("jwt")) {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/jwtoken/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("jwt")
                }
            }).then((res) => {
                if (res.data) {
                    setData(res.data);
                }
                else {
                    return <Error404 />;
                }
            });

        }
        else {
            return <Error404 />;
        }
    }
    return (
        <>
            {data ? <Outlet /> : <Error404 />}
        </>
    )
}

export default PrivateRoute