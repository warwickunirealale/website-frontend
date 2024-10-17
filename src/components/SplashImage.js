import React from 'react'

export default function SplashImage({ image, main_text, sub_text }) {
    return (
        <div className="relative text-center text-white w-full h-[600px] overflow-hidden">
            <img src={image} alt="Splash Image" className="object-cover" />
            <div className="text-white absolute top-[50vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <strong>{main_text}</strong>
            </div><div className="text-white absolute top-[51vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
                <i>{sub_text}</i>
            </div>
        </div>
    )
}