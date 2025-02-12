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
        <div className="w-full text-white text-center mx-auto rounded-lg my-10 p-12 space-y-16">
          <h2 className="text-5xl w-full text-left mx-auto md:max-w-[45%]">
            <strong>{data.data.attributes.title}</strong>
          </h2>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className="flex justify-center">
            <img
              src={`https://warwickunirealale.containers.uwcs.co.uk${data.data.attributes.image.data.attributes.url}`}
              alt={data.data.attributes.title}
              className="w-full md:w-[45%] h-auto object-contain"
            />
          </div>
          <hr className="my-4 border-t w-full mx-auto md:w-[45%] border-gray-300" />
          <div className="text-left text-lg w-full mx-auto md:max-w-[45%] prose prose-invert">
            <BlocksRenderer
              content={data.data.attributes.body}
              blocks={{
                // Block-level renderer for paragraphs.
                paragraph: ({ children }) => <p className="mb-4">{children}</p>,
                // Renderer for lists. Ordered lists use a grid for two-column layout.
                list: ({ children, format }) => {
                  return format === 'ordered' ? (
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 mb-4 list-decimal list-inside">
                      {children}
                    </ol>
                  ) : (
                    <ul className="list-disc pl-6 mb-4">{children}</ul>
                  )
                },
                // Renderer for list items.
                listItem: ({ children }) => <li>{children}</li>,
                // Fallback for explicit lineBreak blocks.
                lineBreak: () => <br />,
              }}
              /* 
                The renderLeaf prop lets us override how inline text nodes (leaves)
                are rendered. Here, we check if the leaf’s text includes newline characters,
                and if so we split the text on "\n" and interleave <br /> tags.
              */
              renderLeaf={({ leaf, children }) => {
                if (typeof leaf.text === 'string') {
                  const segments = leaf.text.split('\n')
                  return segments.flatMap((segment, idx, arr) => {
                    // If the leaf is marked bold, wrap the segment in <strong>
                    const content = leaf.bold ? (
                      <strong key={`seg-${idx}`}>{segment}</strong>
                    ) : (
                      segment
                    )
                    return idx < arr.length - 1
                      ? [content, <br key={`br-${idx}`} />]
                      : [content]
                  })
                }
                return children
              }}
            />
          </div>
        </div>
        <Footer />
      </div>
    )
  }