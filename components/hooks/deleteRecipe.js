import React from "react";

const deleteRecipe = async (token, id) => {
    try {
        const response = await fetch(`http://10.0.0.106:8000/recipes/delete/${id}`, {
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