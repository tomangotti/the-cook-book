import React from "react";

const editRecipe = async (formData, token, id) => {
    try {
        const response = await fetch(`http://10.0.0.106:8000/recipes/edit/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        })
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Failed to edit recipe.');
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}

export default editRecipe