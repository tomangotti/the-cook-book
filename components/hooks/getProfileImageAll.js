import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

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


const getProfileImageAll = (id) => {
    const [userImage, setUserImage] = useState(null);
    const [error, setError] = useState(null);

    const fetchUserImage = async () => {
        
        const savedToken = await getToken();

        if (!savedToken) {
            setError("Token not found");
            return null;
        }

        try {
            console.log("hello1")
            const response = await fetch(`https://mysite-p4xg.onrender.com/users/profile/image/user/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${savedToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                setUserImage(data);
            } else {
                setError(response.status);
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            setError("Network error");
        } 
    };

    useEffect(() => {
        fetchUserImage();
    }, []);
    
    return userImage; 
}

export default getProfileImageAll;