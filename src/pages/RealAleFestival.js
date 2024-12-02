import React from "react";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import SplashImage from "../components/SplashImage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function RealAleFestival() {
    const { loading, error, data } = useFetch("http://localhost:1337/api/festival-page?populate=splash_image,details");

    if (loading) {
        return <></>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            <Navbar />
            <SplashImage
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text={"The Real Ale Festival"}
                sub_text={""}
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
            <strong className=""><h1 className="text-4xl">What the festival is all about</h1></strong>
            <p className="text-2xl">{`With a legacy of ${data.data.attributes.year_count} and still going, the Real Ale Festival is the largest student-run beer festival in Europe`}</p>
            {data.data.attributes.details.map((entry, index) => (
                <div key={entry.id}>
                    <strong><h1 className="text-3xl">{entry.header}</h1></strong>
                    <p className="text-2xl">{entry.body}</p>
                    {entry.link && (
                        <Link to={entry.link}>
                            {entry.link_text}
                        </Link>
                    )}
                </div>
            ))}
            </div>
            <Footer />
        </div>
    )
}