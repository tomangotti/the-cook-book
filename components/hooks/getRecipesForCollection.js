
import { useState, useEffect } from "react";



const getRecipesForCollection = (userId) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const getData = () => {
        fetch(`https://mysite-p4xg.onrender.com/recipes/get-user-fav-recipes/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
            },
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    console.log("fetch ok!!!!")
                    setData(data);
                    setIsLoading(false);
                });
            } else {
                console.log("fetch not ok!!!!")
                setError("Error fetching data");
                setIsLoading(false);
            }
        })
        .catch((err) => {
            console.log("fetch error!!!!")
            setError("Error fetching data");
            setIsLoading(false);
        });
    }

        useEffect(() => {
            getData();
        }, []);

    return { data, isLoading, error };

}

export default getRecipesForCollection;