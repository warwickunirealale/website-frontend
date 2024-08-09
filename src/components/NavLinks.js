import { NavLink, Link } from "react-router-dom";
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";

export default function NavLinks() {
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

  return (
    <>
        <nav className="w-1/3 flex justify-end">
            <div className="hidden w-full justify-between md:flex">
                <NavLink to="/">About Us</NavLink>
                <NavLink to="/">Blog</NavLink>
                <NavLink to="/">Sponsers</NavLink>
                <NavLink to="/">Contact Us</NavLink>
                <Link to="/"><BsInstagram size="32"/></Link>
                <Link to="/"><BsWhatsapp size="32"/></Link>
                <Link to="/"><BsTiktok size="32"/></Link>
            </div>
            <div className="md:hidden">
                <button onClick={toggleNavbar}>
                    {isOpen ? <IoClose /> : <FiMenu /> }
                </button>
            </div>
        </nav>
        {isOpen && (
            <div className="md:hidden flex flex-col items-center basis-full">
                <NavLink to="/">About Us</NavLink>
                <NavLink to="/">Blog</NavLink>
                <NavLink to="/">Sponsers</NavLink>
                <NavLink to="/">Contact Us</NavLink>
                <Link to="/"><BsInstagram size="32"/></Link>
                <Link to="/"><BsWhatsapp size="32"/></Link>
                <Link to="/"><BsTiktok size="32"/></Link>
            </div>
        )}
    </>
  )
}
