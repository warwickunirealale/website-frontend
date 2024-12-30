import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function ArticlesTable({ initialFilters = { title: '', categories: [] } }) {
    const [filters, setFilters] = useState({
        title: initialFilters.title || '',
        categories: initialFilters.categories || [],
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const [formInputs, setFormInputs] = useState({
        title: initialFilters.title || '',
        categories: initialFilters.categories || [],
    });

    // Build initial query based on the initialFilters prop passed in
    const [queryUrl, setQueryUrl] = useState(() => {
        const queryParams = []
        if (filters.title) {
            queryParams.push(`filters[title][$contains]=${encodeURIComponent(filters.title)}`);
        }
        if (filters.categories.length > 0) {
            queryParams.push(
                filters.categories.map((category) => `filters[categories][id][$in]=${category}`).join('&')
            );
        }
        return `http://localhost:1337/api/articles?populate=*&${queryParams.join('&')}`;
    }, [filters]);

    // Fetch all categories for the checkboxes
    const { error: categoryError, loading: categoryLoading, data: categoryData } = useFetch('http://localhost:1337/api/categories');

    // Update the query URL whenever filters change
    useEffect(() => {
        const queryParams = []
        if (filters.title) {
            queryParams.push(`filters[title][$contains]=${encodeURIComponent(filters.title)}`);
        }
        if (filters.categories.length > 0) {
            queryParams.push(
                filters.categories.map((category) => `filters[categories][id][$in]=${category}`).join('&')
            );
        }
        const initialUrl = `http://localhost:1337/api/articles?populate=*&${queryParams.join('&')}`;
        setQueryUrl(initialUrl);
    }, [filters])
    
    // Fetch filtered blogs
    const { error, loading, data } = useFetch(queryUrl);
    
    const handleCategoryChange = (categoryId) => {
        setFormInputs((prev) => {
            const updatedCategories = prev.categories.includes(categoryId)
                ? prev.categories.filter((id) => id !== categoryId)
                : [...prev.categories, categoryId];
            return { ...prev, categories: updatedCategories };
        });
    };

    const handleTitleChange = (e) => {
        setFormInputs({ ...formInputs, title: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilters(formInputs);
    };

    if (loading || categoryLoading) {
        return <p>Loading...</p>;
    }
    if (error || categoryError) {
        return <p>Error: {error?.message || categoryError?.message}</p>;
    }

    return(
        <div className='w-[90%] mx-auto'>
            {/* Filtering form */}
            <form onSubmit={handleSubmit} className='mb-4 flex items-center gap-2 w-[80%] mx-auto'>
                {/* Title Input */}
                <div className='relative flex-grow'>
                    <FaSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                    <input 
                        type="text"
                        value={formInputs.title}
                        placeholder='Filter by title'
                        onChange={handleTitleChange}
                        className='w-full pl-8 pr-2 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    />
                </div>
                {/* Category checkboxes */}
                <div className='relative'>
                    <button type="button"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className='bg-gray-100 px-4 py-2 border border-gray-300 rounded hover:bg-gray-200 flex items-center gap-2 transition duration-300'
                    >
                        Filter by categories<IoIosArrowDown />
                    </button>
                    {isDropdownOpen && (
                        <div className='absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10'>
                            <div className="p-2 flex flex-col gap-2">
                                {categoryData?.data.map((category) => (
                                    <label key={category.id} className='flex items-center gap-2'>
                                        <input 
                                            type="checkbox"
                                            value={category.id}
                                            checked={formInputs.categories.includes(category.id)}
                                            onChange={() => handleCategoryChange(category.id)}
                                        />
                                        {category.attributes.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    Search
                </button>
            </form>

            {/* Article List */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {data?.data.map((blog) => (
                        <Link key={blog.id} to={`/blogs/${blog.id}`}
                        className='flex flex-col items-center bg-white p-4 border rounded-lg shadow-sm hover:shadow-md w-64 transition-transform hover:scale-105'>
                            <img src={`http://localhost:1337${blog.attributes.image.data.attributes.url}`}
                            alt="logo"
                            className="w-full h-48 rounded-t-lg object-contain" />
                            <div className='mt-2 text-center'>
                                <strong className="text-center text-lg">{blog.attributes.title}</strong>
                            </div>
                        </Link>
                ))}
            </div>
        </div>
    )
}