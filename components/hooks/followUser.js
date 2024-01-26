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

const followUser = async (id) => {

    const savedToken = await getToken();

    if (!savedToken) {
        return;
    }

    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/social/follow/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${savedToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            return true
        } else {
            console.log(response.status)   
            return false
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
        return false
    }
    
}

export default followUser;