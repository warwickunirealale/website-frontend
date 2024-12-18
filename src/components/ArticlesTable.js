import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'



export default function ArticlesTable() {
    const { error, loading, data } = useFetch('http://localhost:1337/api/articles?populate=image')

    if (loading) {
        return <></>
    }
    if (error) {
        return <p>Error</p>
    }

    console.log(data);

    return(
        <div className='flex flex-wrap w-[90%] mx-auto gap-4 justify-center'>
            {data.data.map((blog) => (
                    <Link key={blog.id} to={`/blogs/${blog.id}`}
                    className='flex flex-col items-center bg-white p-4 border rounded-lg shadow-sm hover:shadow-md w-64'>
                        <img src={`http://localhost:1337${blog.attributes.image.data.attributes.url}`}
                        alt="logo"
                        className="w-full h-48 rounded-t-lg object-contain" />
                        <div className='mt-2 text-center'>
                            <strong className="text-center text-lg">{blog.attributes.title}</strong>
                        </div>
                    </Link>
            ))}
        </div>
    )
}