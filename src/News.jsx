import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import ReactHtmlParser from 'react-html-parser';

const News = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/getBYid/optionalData`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }
    return (
        <> {
            data && data.status === "active" ? <Marquee className="bg-[#207daf]" speed={45} gradientWidth={50} pauseOnHover={true}>
                <div className="text-[20px] text-white ">{ReactHtmlParser(data.news)}</div>
            </Marquee>:null}
        </>
    )
}

export default News