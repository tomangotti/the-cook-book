import storeToken from "../tokens/storeToken";

const postLogin = async (info) => {
    
    
    const response = await fetch('http://10.0.0.106:8000/users/login', {
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