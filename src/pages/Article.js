import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useFetch from '../hooks/useFetch'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

export default function Article() {
  const { id } = useParams()
  
  const { loading, error, data } = useFetch(`https://warwickunirealale.containers.uwcs.co.uk/api/articles/${id}?populate=*`)

  if (loading) {
    return <p></p>
  }
  if (error) {
      return <p>Error</p>
  }
  return (
    <div>
      <Navbar />
      <div className="w-ful text-white text-center mx-auto rounded-lg my-10 p-12 space-y-16">
          <h2 className='text-5xl w-full text-left mx-auto md:max-w-[45%]'><strong>{data.data.attributes.title}</strong></h2>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className="flex justify-center">
            <img
              src={`https://warwickunirealale.containers.uwcs.co.uk${data.data.attributes.image.data.attributes.url}`}
              alt={`${data.data.attributes.title}`}
              className='w-full md:w-[45%] h-auto object-contain'
            />
          </div>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className='text-left text-lg w-full mx-auto md:max-w-[45%]'>
            <BlocksRenderer content={data.data.attributes.body} />
          </div>
      </div>
      <Footer />
    </div>
  )
}
