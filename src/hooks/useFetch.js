import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)  // Store of any data fetched, initially set to null
    const [error, setError] = useState(null)    // Store any error thrown
    const [loading, setLoading] = useState(true)    // Determine if we are loading any content

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url) // Fetching data from the url
                const json = await res.json() // Parsing response into JSON
                setData(json)
                setLoading(false)
            } catch(error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return { loading, error, data }
}

export default useFetch