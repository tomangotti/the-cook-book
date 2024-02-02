import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';


const getToken = async () => {
    try {
        const savedToken = await AsyncStorage.getItem('authToken');
        
        if (savedToken) {
            return savedToken;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return false;
    }
};

const checkToken = async (userId, setUserId) => {
    const savedToken = await getToken();

    if (!savedToken) {
        console.log('Token not found. User is not authenticated.');
        return false;
    }
    try {
        const response = await fetch('https://mysite-p4xg.onrender.com/users/check-logged-in', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${savedToken}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`token: ${JSON.stringify(data)}`);
            setUserId(data.user_id)
            return true;
        } else {
            console.error('Error checking token:', response.status);
            return false;
        }
    } catch (error) {
        console.error('Error checking token:', error);
        return false;
    }

};

export default checkToken;