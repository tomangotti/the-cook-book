import storeToken from "../tokens/storeToken"


const postNewUser = async (body) => {

    const response = await fetch('http://10.0.0.106:8000/users/create', {
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