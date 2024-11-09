import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SplashImage from '../components/SplashImage'
import Footer from '../components/Footer'

export default function Homepage() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/homepage?populate=about,about.image,splash_image')

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }
    
    console.log(data)
    return (
        <div>
            <Navbar />
            <SplashImage
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text={"We are Real Ale"}
                sub_text={"Getting boozy since 1973"}
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl">What we're all about</h1></strong>
                <div className="container mx-auto py-16 space-y-16">
                    {data.data.attributes.about.map((entry, index) => (
                        <div key={entry.id}
                        className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:text-left' : 'md:flex-row-reverse md:text-right'} `}>
                            <div className='w-full md:w-1/3 flex justify-center'>
                                <img src={`http://localhost:1337${entry.image.data.attributes.url}`}
                                    alt={`${entry.header} Image`}
                                    className="object-cover w-full h-64 md:h-80 rounded-lg"/>
                            </div>
                            <div className="w-full md:w-2/3 p-6 flex flex-col justify-center">
                                <div className="space-y-4">
                                    <h1 className="text-4xl text-center">{entry.header}</h1>
                                    <p className="text-lg md:text-xl">{entry.body}</p>
                                </div>
                                {entry.link && (
                                    <Link 
                                        to={entry.link}
                                        className="inline-block bg-white text-black py-2 px-4 rounded-lg mt-4 text-center hover:bg-gray-300 transition duration-300 max-w-max mx-auto">
                                        Learn more
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}