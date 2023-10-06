


const checkToken = (savedToken, token, setToken, setloggedIn, setLoggedIn) => {
    fetch(`http://10.0.0.106:8000/users/check-logged-in`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${savedToken}`,
            'Content-Type': 'application/json'
        },
    })
    .then((r) => {
        if(r.ok){
            setLoggedIn(true)
            setToken(savedToken)
        }else{
            setLoggedIn(false)
        }
    })
    .catch((error) => {

    })

    return {loggedIn, token}
}


export default checkToken