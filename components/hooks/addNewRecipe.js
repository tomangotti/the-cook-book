import react from "react";

const addNewRecipe = async (formData, token) => {
    try {
        const response = await fetch('http://10.0.0.106:8000/recipes/addNew', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`, 
            },
            body: formData,
        });
  
        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            throw new Error('Failed to save recipe.');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};


export default addNewRecipe