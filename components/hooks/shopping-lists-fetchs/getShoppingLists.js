import {useState, useEffect} from 'react'



const getShoppingLists = (userId) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    

    const getData = () => {
        setIsLoading(true)

        fetch(`https://mysite-p4xg.onrender.com/shopping-lists/get/users/${userId}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((r) => {
                if(r.ok){
                    r.json().then((data) => {
                        setData(data)
                        setIsLoading(false)
                    })
                } else{
                    setError("Request failed")
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                setError(err.message)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getData()
    },[])

    return {data, isLoading, error}
}

export default getShoppingLists