import { useState, useEffect } from "react";

const getRecipes = (endpoint) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        console.log("fetching data");
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/all`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setData(data);
                        setIsLoading(false);
                    });
                } else {
                    setError("Request failed");
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        getData();
    };

    return { data, isLoading, error, reFetch };
};

export default getRecipes;