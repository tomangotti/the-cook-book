import { useEffect, useState } from "react"


const GetUserCollecionRating = (userId, collectionId) => {
    const [data, setData] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        
        console.log(`user id before fetch: ${userId}`)
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipe-collections/${collectionId}/ratings/${userId}`)
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
    }

    useEffect(() => {
        getData();
    }, []);

    return {data, isLoading, error};

}


export default GetUserCollecionRating