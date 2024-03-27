
const PostCodeCheck = async (code) => {
    console.log(code)
    const response = await fetch("https://mysite-p4xg.onrender.com/users/approve/code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({code: code})
    })

    if (response.ok) {
        
        data = await response.json()
        console.log(data.user_id)

        return data.user_id
    } else {
        return false
    }
    
}

export default PostCodeCheck