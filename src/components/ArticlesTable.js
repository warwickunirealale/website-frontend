import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { FaSearch } from "react-icons/fa";

export default function ArticlesTable({ initialFilters }) {
    const [filters, setFilters] = useState({
        title: initialFilters.title || '',
        categories: initialFilters.categories || [],
    });

    const [formInputs, setFormInputs] = useState({
        title: initialFilters.title || '',
        categories: initialFilters.categories || [],
    });

    const [queryUrl, setQueryUrl] = useState('http://localhost:1337/api/articles?populate=*');

    // Fetch all categories for the checkboxes
    const { error: categoryError, loading: categoryLoading, data: categoryData } = useFetch('http://localhost:1337/api/categories');

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

        const queryParams = [];
        if (formInputs.title) {
            queryParams.push(`filters[title][$contains]=${encodeURIComponent(formInputs.title)}`);
        }
        if (formInputs.categories.length > 0) {
            queryParams.push(
                formInputs.categories.map((category) => `filters[categories][id][$in]=${category}`).join('&')
            );
        }
        const newUrl = `http://localhost:1337/api/articles?populate=image&${queryParams.join('&')}`;
        setQueryUrl(newUrl);
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
            <form onSubmit={handleSubmit} className='mb-4'>
                {/* Title Input */}
                <input 
                    type="text"
                    value={formInputs.title}
                    placeholder='Filter by title'
                    onChange={handleTitleChange}
                />
                {/* Category checkboxes */}
                <div className="flex flex-wrap gap-2">
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <FaSearch />
                </button>
            </form>

            {/* Article List */}
            <div className='flex flex-wrap gap-4 justify-center'>
                {data?.data.map((blog) => (
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
        </div>
    )
}