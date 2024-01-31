import { useState, useEffect } from "react";

const getFavoriteCollections = (endPoint) => {
    const [favoriteCollections, setFavoriteCollections] = useState([])
    const [favCollectionsIsLoading, setFavCollectionsIsLoading] = useState(false)
    const [favCollectionsError, setFavCollectionsError] = useState(null)

    const getData = () => {
        setFavCollectionsIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/favorites/collections/user/get/${endPoint}`)
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        console.log(data)
                        setFavoriteCollections(data);
                        setFavCollectionsIsLoading(false);
                    })
                } else {
                    setFavCollectionsError("Request failed");
                    setFavCollectionsIsLoading(false);
                }
            })
            .catch((err) => {
                setFavCollectionsError(err.message);
                setFavCollectionsIsLoading(false);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    const reFetchFavCollections = () => {
        setFavCollectionsIsLoading(true);
        getData();
    };

    return {favoriteCollections, favCollectionsIsLoading, favCollectionsError, reFetchFavCollections}
}



export default getFavoriteCollections