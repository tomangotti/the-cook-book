
const PostEmailForPasswordReset = async (email) => {
    console.log(email)
    const response = await fetch("https://mysite-p4xg.onrender.com/users/send/code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    })

    if (response.ok) {
        return true
    } else {
        return false
    }
    
}

export default PostEmailForPasswordReset