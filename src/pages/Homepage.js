import React from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Navbar from '../components/Navbar'
import SplashImage from '../components/SplashImage'

const ARTICLES = gql`
    query GetArticles {
        articles {
            data {
                id,
                attributes {
                    title,
                    body
                }
            }
        }
    }
`   

export default function Homepage() {
    const { loading, error, data } = useFetch('http://localhost:1337/api/homepage?populate=splash_image')

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error</p>
    }
    
    console.log(data)
    return (
        <div>
            <Navbar />
            <SplashImage
                image={`http://localhost:1337${data.data.attributes.splash_image.data.attributes.url}`}
                main_text={"We are Real Ale"}
                sub_text={"Getting boozy since 1973"}
            />
            <div className="bg-neutral-900 w-full h-full py-5 text-white text-center">
                <strong className=""><h1 className="text-4xl">Not just about Beer</h1></strong>
                <p>Everything we do here at Real Ale is about community.</p>
            </div>

            <div>
            {/*
            {data.articles.data.map((article) => (
                <div key={article.id} className="article-card">
                    <h2>{article.attributes.title}</h2>
                    <p>{article.attributes.body[0].children[0].text}</p>
                    <Link to={`/articles/${article.id}`}>Read more</Link>
                </div>
            ))}
            */}
            </div>
        </div>
    )
}