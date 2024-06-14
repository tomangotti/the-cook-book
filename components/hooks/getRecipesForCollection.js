import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const getToken = async () => {
    try {
        const savedToken = AsyncStorage.getItem('authToken');
        if (savedToken) {
            return savedToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

const getRecipesForCollection =  async () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const savedToken = await getToken();

    if (!savedToken) {
        setError("Token not found");
        return null;
    }

    const getData = () => {
        setIsLoading(true);
        fetch(`https://mysite-p4xg.onrender.com/recipes/get-user-fav-recipes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${savedToken}`, 
            },
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((data) => {
                        console.log("fetch ok!!!!")
                        setData(data);
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
    }

    useEffect(() => {
        getData();
    }, []);

    return {data, isLoading, error}
}

export default getRecipesForCollection;