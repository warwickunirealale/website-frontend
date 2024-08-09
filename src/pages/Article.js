import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

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
    return <p>Loading...</p>
  }
  if (error) {
      return <p>Error</p>
  }
  console.log(data)

  return (
    <div>
      <div className="article-card">
          <h2>{data.article.data.attributes.title}</h2>
          <img src={data.article.data.attributes.cover}></img>
          <p>{data.article.data.attributes.body[0].children[0].text}</p>
      </div>
    </div>
  )
}
