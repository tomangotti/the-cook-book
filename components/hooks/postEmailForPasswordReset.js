
const PostEmailForPasswordReset = async (email) => {
    const response = await fetch("https://api.example.com/forgot-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email: email})
    })
    
}