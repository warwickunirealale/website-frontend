import React from "react";
import Navbar from "../components/Navbar";
import SplashImage from "../components/SplashImage";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Sponsers() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/sponsers?populate=*')

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            <Navbar />
            <SplashImage 
                image=""
                main_text="Our Sponsers"
                sub_text=""
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl">Get in touch</h1></strong>
                    <div className="flex flex-row justify-center">
                        {data.data.attributes.sponser_logos.map(entry => (
                            <Link to="/"><img src="" key={entry.id} alt="" /></Link>
                        ))}
                    </div>
            </div>
            <Footer />
        </div>
    )
}