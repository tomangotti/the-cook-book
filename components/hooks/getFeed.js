import { useState, useEffect } from "react";

const getFeed = (user_id) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/feed/recipes/${user_id}`)
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

export default getFeed;