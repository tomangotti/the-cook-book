import react from "react"



const PostItemToCart = async (item) => {
    console.log(item)

    const response = await fetch('http://10.0.0.106:8000/recipes/cart/add', {
        method: 'POST',
        headers: { 'Content-Type':'application/json'},
        body: JSON.stringify(item)
    })

    if(response.ok) {
        const resData = await response.json()
        return true
    } else {
        return false
    }
    

}

export default PostItemToCart