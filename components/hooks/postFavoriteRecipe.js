import React from "react";

const postFavoriteRecipe = async (user_id, recipe_id) => {
    console.log("hello")
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/favorites/recipes/add/${user_id}/${recipe_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            console.log('Failed to post favorite recipe');
            return false
        }

        
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default postFavoriteRecipe;