import { useState, useEffect } from "react";

const getUsersCollections = (endPoint) => {
    const [usersCollections, setusersCollections] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipe-collections/user/get/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setusersCollections(data);
                        setIsLoading(false);
                    })
                } else {
                    setError("Request failed");
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        getData();
    };

    return {usersCollections, isLoading, error, reFetch}
}



export default getUsersCollections