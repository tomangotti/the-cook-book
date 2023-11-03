import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const savedToken = await AsyncStorage.getItem('authToken');
        if (savedToken) {
            return savedToken;
        } else {
            return null; // Return null instead of false
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null; // Return null on error
    }
};

const getUserInfo = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserInfo = async () => {
        setIsLoading(true);

        const savedToken = await getToken();

        if (!savedToken) {
            setError("Token not found");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://mysite-p4xg.onrender.com/users/getUserInfo`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${savedToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                setUserInfo(data);
            } else {
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
        fetchUserInfo();
    }, []);

    const refetch = () => {
        fetchUserInfo();
    }

    return { userInfo, isLoading, error, refetch}; 
};

export default getUserInfo;