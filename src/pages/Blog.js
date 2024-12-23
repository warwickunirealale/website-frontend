import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Navbar from '../components/Navbar'
import SplashImage from '../components/SplashImage'
import ArticlesTable from '../components/ArticlesTable'
import Footer from '../components/Footer'

export default function Blog() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/blog-mainpage?populate=splash_image')

    if (loading) {
        return <></>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            <Navbar />
            <SplashImage
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text={"Our Blogs"}
                sub_text={""}
            />
            <div className="bg-neutral-900 w-full h-full py-5 my-6">
                <ArticlesTable initialFilters={{title: 'BRUBL', categories: [2]}} />
            </div>
            <Footer />
        </div>
    )
}