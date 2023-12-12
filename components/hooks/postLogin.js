import storeToken from "../tokens/storeToken";

const postLogin = async (info) => {
    
    
    const response = await fetch('https://mysite-p4xg.onrender.com/users/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    })

    if(response.ok) {
        const data = await response.json()
        storeToken(data.token)
        return true
    } else {
        return false
    }

}

export default postLogin;