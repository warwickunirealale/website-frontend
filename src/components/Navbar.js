import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { BsInstagram, BsWhatsapp, BsTiktok } from "react-icons/bs";
import NavLinks from './NavLinks';


/*
const NavbarElement = ({ url, text }) => {
    <li>
        <a href={url}>{text}</a>
    </li>
}
*/

export default function Navbar() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/socialmedia?populate=logo')
    if (loading)
        return <p>Loading</p>
    if (error)
        return <p>Error</p>

    console.log(data)
    console.log(`http://localhost:1337${data.data.attributes.logo.data.attributes.url}`);

    return <header className="bg-white sticky top-0 flex-wrap z-[20] px-[2em] mx-auto flex w-full items-center justify-between py-1">
        <div className="size-16">
            <img src={`http://localhost:1337${data.data.attributes.logo.data.attributes.url}`} alt="logo" />
        </div>
        <NavLinks />
    </header>
}