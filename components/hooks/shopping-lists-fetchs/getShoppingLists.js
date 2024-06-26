import {useState, useEffect} from 'react'



const getShoppingLists = (userId) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    

    const getData = () => {
        setIsLoading(true)
        console.log(userId)
        fetch(`https://mysite-p4xg.onrender.com/shopping-list/get/users/${userId}`)
            .then((r) => {
                if(r.ok){
                    r.json().then((data) => {
                        setData(data)
                        setIsLoading(false)
                    })
                } else{
                    console.log(r)
                    setError("Request failed")
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err.message)
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