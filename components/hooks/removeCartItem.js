import react from "react";

const RemoveCartItem = async (item) => {
    
    const response = await fetch('http://10.0.0.106:8000/recipes/cart/remove', {
        method: 'DELETE',
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

export default RemoveCartItem;