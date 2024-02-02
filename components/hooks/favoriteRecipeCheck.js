import { useEffect, useState } from "react"


const FavoriteRecipeCheck = (userId, recipeId) => {
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/favorites/recipes/check/${userId}/${recipeId}`)
            .then((r) => {
                if (r.ok) {
                    console.log("ok")
                    setData(true);
                    setIsLoading(false);
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


export default FavoriteRecipeCheck