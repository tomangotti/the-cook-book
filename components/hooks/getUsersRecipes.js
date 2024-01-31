import { useState, useEffect } from "react";

const getUsersRecipes = (endPoint) => {
    const [userRecipes, setUserRecipes] = useState([])
    const [recipesIsLoading, setRecipesIsLoading] = useState(false)
    const [recipeError, setRecipeError] = useState(null)

    const getData = () => {
        setRecipesIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/users/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setUserRecipes(data);
                        setRecipesIsLoading(false);
                    })
                } else {
                    setRecipeError("Request failed");
                    setRecipesIsLoading(false);
                }
            })
            .catch((error) => {
                setRecipeError(error);
                setRecipesIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const reFetchRecipes = () => {
        setRecipesIsLoading(true);
        getData();
    };

    return {userRecipes, recipesIsLoading, recipeError, reFetchRecipes}
}



export default getUsersRecipes