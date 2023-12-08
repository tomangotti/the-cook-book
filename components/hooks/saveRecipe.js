import react from "react";


const SaveRecipe = async (userId, itemId, option) => {
    
    try{
        const response = await fetch(`http://10.0.0.106:8000/recipes/addNew`, {
        method: `${option}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userId,
            recipe: itemId
        })
    })
    
        if(response.ok) {
            const resData = await response.json();
            return true
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
    
}

export default SaveRecipe