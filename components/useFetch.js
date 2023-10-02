import { useState, useEffect } from "react";
import axios from 'axios'


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `http://127.0.0.1:8000/${endpoint}`,
        headers: {
            'Content-Type': 'application/json'
        },
        params: { ...query}
    };
    
    const getData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.get(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert('There is an error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const reFetch = () => {
        setIsLoading(true);
        getData();
    }

    return { data, isLoading, error, reFetch}
}

export default useFetch