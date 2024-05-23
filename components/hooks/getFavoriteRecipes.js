import { useState, useEffect } from "react";

const getFavoriteRecipes = (endPoint) => {
    const [favoriteRecipes, setFavoriteRecipes] = useState([])
    const [favRecipesIsLoading, setFavRecipesIsLoading] = useState(false)
    const [favRecipesError, setFavRecipesError] = useState(null)

    const getData = () => {
        setFavRecipesIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/favorites/recipes/user/get/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setFavoriteRecipes(data);
                        setFavRecipesIsLoading(false);
                    })
                } else {
                    setFavRecipesError("Request failed");
                    setFavRecipesIsLoading(false);
                }
            })
            .catch((err) => {
                setFavRecipesError(err.message);
                setFavRecipesIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const reFetchFavRecipes = () => {
        setFavRecipesIsLoading(true);
        getData();
    };

    return {favoriteRecipes, favRecipesIsLoading, favRecipesError, reFetchFavRecipes}
}



export default getFavoriteRecipes