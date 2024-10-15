import { NavLink, Link, useLocation } from "react-router-dom";
import React from 'react'
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import {
    mobileNavContainerVariant,
    mobileNavExitProps,
    mobileNavListVariant
} from "./animationConfig";

const activeClassName = "selected navlink";
const activeStyleCallback = ({ isActive}) => isActive ? activeClassName : "navlink";

const NavElements = () => {
    return (
        <>
            <NavLink to="/">About Us</NavLink>
            <NavLink to="/">Blog</NavLink>
            <NavLink to="/">Sponsers</NavLink>
            <NavLink to="/">Contact Us</NavLink>
            <Link to="/"><BsInstagram size="32"/></Link>
            <Link to="/"><BsWhatsapp size="32"/></Link>
            <Link to="/"><BsTiktok size="32"/></Link>
        </>
    )
};

export default function NavLinks() {
    const [ isOpen, setIsOpen ] = useState(false);
    const location = useLocation();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

  return (
    <>
        <nav className="w-1/3 flex justify-end">
            <div className="hidden w-full justify-between md:flex">
                <NavElements />
            </div>
            <div className="md:hidden">
                <button onClick={toggleNavbar}>
                    {isOpen ? <IoClose /> : <FiMenu /> }
                </button>
            </div>
        </nav>
        <AnimatePresence mode="wait">  
            {isOpen && (
                <motion.div
                layout ="position"
                key="nav-links"
                variants={mobileNavContainerVariant}
                initial="hidden"
                animate="show"
                className="mt-4 basis-full text-center md:hidden leading-loose">
                    <motion.div className={activeStyleCallback} variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/">About Us</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/">Blog</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/">Sponsers</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/">Contact Us</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <table className="mx-auto w-[0.75vw] mt-2 flex flex-row justify-around align-middle">
                            <th>
                                <a className="" href="https://www.google.com"><BsInstagram className="cursor-pointer" size="32"/></a>
                            </th>
                            <th>
                                <Link to="/"><BsWhatsapp className="" size="32"/></Link>
                            </th>
                            <th className="">
                                <Link to="/"><BsTiktok size="32"/></Link>
                            </th>
                        </table>
                    </motion.div>
                </motion.div>
            )}            
        </AnimatePresence>
    </>
  )
}