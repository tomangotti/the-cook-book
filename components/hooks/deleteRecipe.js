import React from "react";

const deleteRecipe = async (token, id) => {
    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/recipes/delete/${id}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to delete recipe.');
        }
        
    
    }catch (error) {
        console.error(error);
        return null;
    }

}

export default deleteRecipe