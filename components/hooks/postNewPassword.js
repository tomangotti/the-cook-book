
const PostNewPassword = async (password, user_id ) => {
    console.log(password)
    console.log(user_id)
    const response = await fetch("https://mysite-p4xg.onrender.com/users/change/password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password: password, user_id: user_id})
    })

    if (response.ok) {
        return true
    } else {
        return false
    }
}

export default PostNewPassword;