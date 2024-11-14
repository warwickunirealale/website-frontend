import React from "react";
import SplashImage from "../components/SplashImage";
import Navbar from "../components/Navbar";
import useFetch from "../hooks/useFetch";
import Footer from "../components/Footer";

export default function ContactUs() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/about-us-page?populate=aboutus_text,splash_image')

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
                // image = {}
                main_text="Contact Us"
                sub_text=""
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl">Get in touch</h1></strong>

            </div>
            <Footer />
        </div>
    )
}