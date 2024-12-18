import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Header from '../components/Header'
import SplashImage from '../components/SplashImage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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

export default function Article() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: { id: id }
  })
  
  if (loading) {
    return <p></p>
  }
  if (error) {
      return <p>Error</p>
  }

  return (
    <div>
      <Navbar />
      <div className="">
          <h2>{data.article.data.attributes.title}</h2>
          <img src={data.article.data.attributes.cover}></img>
          <p>{data.article.data.attributes.body[0].children[0].text}</p>
      </div>
      <Footer />
    </div>
  )
}
