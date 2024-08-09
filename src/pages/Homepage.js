import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Navbar from '../components/Navbar'

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
    const { loading, error, data } = useQuery(ARTICLES)

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
            <div>
            {data.articles.data.map((article) => (
                <div key={article.id} className="article-card">
                    <h2>{article.attributes.title}</h2>
                    <p>{article.attributes.body[0].children[0].text}</p>
                    <Link to={`/articles/${article.id}`}>Read more</Link>
                </div>
            ))}
            </div>
        </div>
    )
}