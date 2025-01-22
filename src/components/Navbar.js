import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import NavLinks from './NavLinks';

export default function Navbar() {
    const { loading, error, data } = useFetch('https://warwickunirealale.containers.uwcs.co.uk/api/socialmedia?populate=logo')
    if (loading)
        return <p>Loading</p>
    if (error)
        return <p>Error</p>

    return <header className="bg-white sticky top-0 flex-wrap z-[20] px-[2em] mx-auto flex w-full items-center justify-between py-1">
        <div className="size-16">
            <Link to="/"><img src={`https://warwickunirealale.containers.uwcs.co.uk${data.data.attributes.logo.data.attributes.url}`} alt="logo" /></Link>
        </div>
        <NavLinks />
    </header>
}