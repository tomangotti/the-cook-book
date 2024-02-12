import {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
    try {
        const savedToken = await AsyncStorage.getItem('authToken');
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

const getProfileInformation = (endpoint) => {
    const [profileData, setProfileData] = useState([])
    const [recipeData, setRecipeData] = useState([])
    const [collectionData, setCollectionData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    
    const getData =  async () => {
        const savedToken = await getToken();
        setIsLoading(true);

        if (!savedToken) {
            setError("Token not found");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://mysite-p4xg.onrender.com/users/profile/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${savedToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData(data[0])
                setRecipeData(data[1])
                setCollectionData(data[2])
            } else {
                console.log(response.status)    
                setError(response.status);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setError("Network error");
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getData();
    }, []);

    const reFetch = () => {
        setIsLoading(true);
        getData();
    };

    return {profileData, recipeData, collectionData, isLoading, error, reFetch}
}

export default getProfileInformation;