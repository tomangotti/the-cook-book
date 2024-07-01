import {useState, useEffect} from 'react'



const getFetch = (endpoint) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    

    const getData = () => {
        setIsLoading(true)

        fetch(`https://mysite-p4xg.onrender.com/${endpoint}`)
            .then((r) => {
                if(r.ok){
                    r.json().then((data) => {
                        setData(data)
                        setIsLoading(false)
                    })
                } else{
                    console.log(r)
                    console.log("getging data")
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

export default getFetch