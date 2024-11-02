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
        <div className='grid w-[90%] mx-auto gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {data.data.map((blog) => (
                    <Link key={blog.id} to={`/${blog.id}`}
                    className='flex flex-col items-center p-4 border rounded sahdow-sm hover:shadow-md'>
                        <img src={`http://localhost:1337/${blog.attributes.image.data.attributes.url}`}
                        alt="logo"
                        className="w-full h-32 object-cover rounded mb-2" />
                        <strong className="text-center">{blog.attributes.title}</strong>
                    </Link>
            ))}
        </div>
    )
}