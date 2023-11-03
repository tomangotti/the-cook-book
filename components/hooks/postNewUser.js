import storeToken from "../tokens/storeToken"


const postNewUser = async (body) => {

    const response = await fetch('https://mysite-p4xg.onrender.com/users/create', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })

    if(response.ok){
        const resData = await response.json()
        storeToken(resData.token)
        return true
    } else {
        console.error(response.message)
        return false
    }
}

export default postNewUser