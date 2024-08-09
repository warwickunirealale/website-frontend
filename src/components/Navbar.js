import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BsInstagram, BsWhatsapp, BsTiktok } from "react-icons/bs";


export default function Navbar() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/socialmedia?populate=logo')
    if (loading)
        return <p>Loading</p>
    if (error)
        return <p>Error</p>

    return <header className="bg-white">
        <nav className="">
            <div>
                <img className="w-16" src={`http://localhost:1337${data.data.attributes.logo.data.attributes.url}`} alt="Logo"></img>
            </div>
            <div className=''>
                <ul>
                    <li>
                        <a href="/">Articles</a>
                    </li>
                    <li>
                        <a href="/">About Us</a>
                    </li>
                    <li>
                        <a href="/">Get Involved</a>
                    </li>
                    <li>
                        <a href="/">Contact Us</a>
                    </li>
                    <li>
                        <a href="/">Sponsers</a>
                    </li>
                    <li>
                        <a href="/"><BsInstagram /></a>
                    </li>
                    <li>
                        <a href="/"><BsWhatsapp /></a>
                    </li>
                    <li>
                        <a href="/"><BsTiktok /></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
}