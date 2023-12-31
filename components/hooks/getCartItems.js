import react, {useState, useEffect} from "react"



const getCartItems = (endpoint) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/cart/userItems/${endpoint}`)
        .then((response) => {
            if(response.ok) {
                response.json().then((data) => { 
                    setData(data);
                    setIsLoading(false);
                })
            } else {
                setError("Request Failed");
                setIsLoading(false);
            }
        })
        .catch((error) => {
            setError(error.message)
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getData()
    },[])

    const reFetch = () => {
        setIsLoading(true)
        getData()
    }

    return {data, isLoading, error, reFetch}
}

export default getCartItems