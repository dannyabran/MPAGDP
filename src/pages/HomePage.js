import { API_URL } from "../api";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePage = () => {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetch(API_URL + "/pages?slug=homepage")
        .then((response) => response.json())
        .then((data) => {
            setPages(data);
        });
    }, []);
    return (
        <>
            <Header />
            <div className="conteudos">
                <div
                    dangerouslySetInnerHTML={{ __html: pages[0]?.content?.rendered }}
                ></div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;