import react from "react"

const postShareRecipe = async (email, id) => {

    try{
        const response = await fetch(`http://10.0.0.106:8000/recipes/share/recipe/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email,
            })
        })

        if(response.ok) {
            return true
        } else {
            return false
        }

    } catch(err){
        console.log(err)
    }

    
}


export default postShareRecipe