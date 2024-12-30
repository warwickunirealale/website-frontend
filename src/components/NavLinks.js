import { NavLink, useLocation } from "react-router-dom";
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
import { useQuery, gql } from "@apollo/client";


const activeClassName = "selected navlink";
const activeStyleCallback = ({ isActive}) => isActive ? activeClassName : "navlink";

const SOCIALMEDIA = gql`
  query GetSocialLinks {
    socialmedia {
      data {
        id,
        attributes {
          instagram,
          whatsapp,
          tiktok
        }
      }
    }
  }
`

export default function NavLinks() {
    const { loading, error, data } = useQuery(SOCIALMEDIA);
    const [ isOpen, setIsOpen ] = useState(false);
    const location = useLocation();

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    if (loading) {
        return <></>
    }

    if (error) {
        return <p>Error</p>
    }

    console.log(data);
    return (
    <>
        <nav className="flex justify-end">
            <div className="space-x-10 hidden w-full justify-between md:flex">
                <NavLink to="/about-us" className="pt-1 transition-transform hover:scale-110 duration-200">About Us</NavLink>
                <NavLink to="/blogs" className="pt-1 transition-transform hover:scale-110 duration-200">Blogs</NavLink>
                <NavLink to="/sponsers" className="pt-1 transition-transform hover:scale-110 duration-200">Sponsers</NavLink>
                <NavLink to="/real-ale-festival" className="pt-1 transition-transform hover:scale-110 duration-200">Real Ale Festival</NavLink>
                <NavLink to="/contact-us" className="pt-1 transition-transform hover:scale-110 duration-200">Contact Us</NavLink>
                <a className="" href={data.socialmedia.data.attributes.instagram}><BsInstagram className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
                <a className="" href={data.socialmedia.data.attributes.whatsapp}><BsWhatsapp className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
                <a className="" href={data.socialmedia.data.attributes.tiktok}><BsTiktok className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
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
                        <NavLink className="transition-transform hover:scale-110 duration-200 block" to="/about-us">About Us</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/blogs" className="transition-transform hover:scale-110 duration-200 block">Blogs</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/sponsers" className="transition-transform hover:scale-110 duration-200 block">Sponsers</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <NavLink to="/contact-us" className="transition-transform hover:scale-110 duration-200 block">Contact Us</NavLink>
                    </motion.div>
                    <motion.div variants={mobileNavListVariant} {...mobileNavExitProps}>
                        <table className="mx-auto w-[0.75vw] mt-2 flex flex-row justify-center align-middle space-x-8">
                            <th>
                                <a className="" href={data.socialmedia.data.attributes.instagram}><BsInstagram className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
                            </th>
                            <th>
                                <a className="" href={data.socialmedia.data.attributes.whatsapp}><BsWhatsapp className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
                            </th>
                            <th className="">
                                <a className="" href={data.socialmedia.data.attributes.tiktok}><BsTiktok className="cursor-pointer transition-transform hover:scale-110 duration-200" size="32"/></a>
                            </th>
                        </table>
                    </motion.div>
                </motion.div>
            )}            
        </AnimatePresence>
    </>
  )
}