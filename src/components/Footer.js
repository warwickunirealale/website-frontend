import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";


export default function Footer() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/socialmedia?populate=logo')

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }

    return (
        <div className="bg-white">
            <div className="flex justify-center pt-5">
                <img className="size-32" src={`http://localhost:1337${data.data.attributes.logo.data.attributes.url}`} alt="logo" />
            </div>
            <div className="flex flex-row justify-center space-x-5 py-10">
                <Link to="" className="text-xl">About us</Link>
                <Link to="" className="text-xl">About us</Link>
                <Link to="" className="text-xl">About us</Link>
            </div>
        </div>
    )
}