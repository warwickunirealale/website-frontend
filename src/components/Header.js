import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id,
        attributes {
          name
        }
      }
    }
  }
`

export default function Header() {
  const { loading, error, data } = useQuery(CATEGORIES)
  
  if (loading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error</p>
  }

  return (
    <div className="header">
        <Link to="/"><h1>Wuras</h1></Link>
        <nav className="categories">
          <span>Filter articles by category:</span>
          {data.categories.data.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>
              {category.attributes.name}
            </Link>
          ))}
        </nav>
    </div>
  )
}
