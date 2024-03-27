const PostNewPassword = async (password, user_id ) => {
    const response = await fetch("https://mysite-p4xg.onrender.com/users/change/password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({code: code})
    })

    if (response.ok) {
        return true
    } else {
        return false
    }
}

export default PostNewPassword;