import { useState, useEffect } from "react";

const getUsersRecipes = (endPoint) => {
    const [userRecipes, setUserRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/users/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setUserRecipes(data);
                        setIsLoading(false);
                    })
                } else {
                    console.log(err.message)
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

    return {userRecipes, isLoading, error, reFetch}
}



export default getUsersRecipes