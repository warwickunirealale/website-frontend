import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import Header from '../components/Header'
import SplashImage from '../components/SplashImage'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useFetch from '../hooks/useFetch'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

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
  // const { loading, error, data } = useQuery(ARTICLE, {
  //   variables: { id: id }
  // })
  
  const { loading, error, data } = useFetch(`http://localhost:1337/api/articles/${id}?populate=*`)

  if (loading) {
    return <p></p>
  }
  if (error) {
      return <p>Error</p>
  }

  console.log(id)
  console.log(data)

  return (
    <div>
      <Navbar />
      <div className="w-ful text-white text-center mx-auto rounded-lg my-10 p-12 space-y-16">
          <h2 className='text-5xl w-full text-left mx-auto md:max-w-[45%]'><strong>{data.data.attributes.title}</strong></h2>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className="flex justify-center">
            <img
              src={`http://localhost:1337${data.data.attributes.image.data.attributes.url}`}
              alt={`${data.data.attributes.title} image`}
              className='w-full md:w-[45%] h-auto object-contain'
            />
          </div>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className='text-left text-lg w-full mx-auto md:max-w-[45%]'>
            <BlocksRenderer content={data.data.attributes.body} />
          </div>
          {/* {data.data.attributes.body.map((child) => (
            <ReactMarkdown key={child.id} className='text-left text-lg w-full mx-auto md:max-w-[45%]'>{child.children[0].text}</ReactMarkdown>
          ))} */}
      </div>
      <Footer />
    </div>
  )
}
