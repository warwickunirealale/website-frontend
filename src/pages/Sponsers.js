import React from "react";
import Navbar from "../components/Navbar";
import SplashImage from "../components/SplashImage";
import Footer from "../components/Footer";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function Sponsers() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/sponsers-page?populate=flagships,flagships.logo,sponsers,sponsers.logo,splash_image')

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
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text="Our Sponsers"
                sub_text=""
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl mt-6 mb-12">Our Flagship Sponsers</h1></strong>
                <div className="flex flex-wrap justify-center gap-36">
                    {data.data.attributes.flagships.map(entry => (
                        <Link to={`/${entry.link}` | "/"}
                        className="group flex justify-center items-center">
                            <img className="w-full max-w-xs grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                            src={`http://localhost:1337${entry.logo.data.attributes.url}`} key={entry.id} alt={`Flagship sponser ${entry.name} logo`} />
                            </Link>
                    ))}
                </div>
                <strong className=""><h1 className="text-3xl mt-6 mb-12">Our Sponsers</h1></strong>
                <div className="mx-16 flex flex-wrap justify-center gap-36">
                    {data.data.attributes.sponsers.map(entry => (
                        <Link to={`/${entry.link}` | "/"}
                        className="group flex justify-center items-center">
                            <img className="w-full max-w-xs grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
                            src={`http://localhost:1337${entry.logo.data.attributes.url}`} key={entry.id} alt={`Sponser ${entry.name} logo`} />
                            </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}