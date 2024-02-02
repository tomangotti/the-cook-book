import React from "react";

const deleteFavoriteRecipe = async (user_id, recipe_id) => {
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/favorites/recipes/remove/${user_id}/${recipe_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.log('delete favorite recipe failed')
            return false;
        }

        const data = await response.json();
        console.log(data);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export default deleteFavoriteRecipe;