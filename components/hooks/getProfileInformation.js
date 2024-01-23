import {useState, useEffect} from 'react';

const getProfileInformation = (endpoint) => {
    const [data, setdata] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/users/profile/info/${endpoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        setdata(data);
                        setIsLoading(false);
                    });
                } else {
                    setError("Request failed");
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        getData();
    };

    return {data, isLoading, error, reFetch}
}