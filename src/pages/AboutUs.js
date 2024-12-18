import React from 'react'
import Navbar from '../components/Navbar'
import SplashImage from '../components/SplashImage'
import Footer from '../components/Footer'
import useFetch from "../hooks/useFetch";

export default function AboutUs() {
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
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text="About Real Ale"
                sub_text="" />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center" >
                {data.data.attributes.aboutus_text.map(entry => (
                    <div key={entry.id} className="py-5">
                        <strong className=""><h1 className="text-4xl">{entry.header}</h1></strong>
                        <p>{entry.body}</p>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}
