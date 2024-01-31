import { useState, useEffect } from "react";

const getUsersCollections = (endPoint) => {
    const [usersCollections, setusersCollections] = useState([])
    const [collectionIsLoading, setCollectionIsLoading] = useState(false)
    const [collectionError, setCollectionError] = useState(null)

    const getData = () => {
        setCollectionIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipe-collections/user/get/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        console.log(data)
                        setusersCollections(data);
                        setCollectionIsLoading(false);
                    })
                } else {
                    setCollectionError("Request failed");
                    setCollectionIsLoading(false);
                }
            })
            .catch((err) => {
                setCollectionError(err.message);
                setCollectionIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const reFetchCollection = () => {
        setCollectionIsLoading(true);
        getData();
    };

    return {usersCollections, collectionIsLoading, collectionError, reFetchCollection}
}



export default getUsersCollections