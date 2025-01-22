import React from "react";
import useFetch from "../hooks/useFetch";
import Navbar from "../components/Navbar";
import SplashImage from "../components/SplashImage";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function RealAleFestival() {
    const { loading, error, data } = useFetch("https://warwickunirealale.containers.uwcs.co.uk/api/festival-page?populate=splash_image,details");

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
                image={`https://warwickunirealale.containers.uwcs.co.uk${data.data.attributes.splash_image.data.attributes.url}`}
                main_text={"The Real Ale Festival"}
                sub_text={""}
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
            <strong className=""><h1 className="text-4xl my-6">What the festival is all about</h1></strong>
            <p className="text-2xl">{`With a legacy of ${data.data.attributes.year_count} and still going, the Real Ale Festival is the largest student-run beer festival in Europe`}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center py-8">
                {data.data.attributes.details.map((entry, index) => (
                    <div key={entry.id} className={`p-4 mx-12 ${
                        index % 2 === 0 && index === data.data.attributes.details.length - 1
                            ? 'col-span-2 justify-self-center'
                            : ''
                    }`}>
                        <strong><h1 className="text-3xl">{entry.header}</h1></strong>
                        <p className="text-xl">{entry.body}</p>
                        {entry.link && (
                            <Link to={entry.link}
                            className="inline-block bg-white text-black py-2 px-4 rounded-lg mt-4 text center hover:bg-gray-300 transition duration-300 max-w-max mx-auto">
                                {entry.link_text}
                            </Link>
                        )}
                    </div>
                ))}
            </div>
            </div>
            <Footer />
        </div>
    )
}