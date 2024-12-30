import React from 'react'


export default function SplashImage({ image, main_text, sub_text }) {
    return (
        <div className="relative text-center text-white w-full h-[600px] overflow-hidden">
            <img
                src={image}
                alt="Splash"
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 opacity-85"
            style={{
                backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0) 90%)'
            }}></div>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <strong className="text-4xl md:text-4xl">{main_text}</strong>
                <i className="text-xl md:text-xl mt-2">{sub_text}</i>
            </div>
        </div>
    )
}