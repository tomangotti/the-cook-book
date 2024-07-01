import React from "react";
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

const deleteFetch = async (endpoint) => {
    const savedToken = await getToken();

    if (!savedToken) {
        console.log("Token not found");
        return false;
    }

    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${savedToken}`,
            },
        })
        if (response.ok) {
            return true;
        } else {
            throw new Error('Failed to delete collection.');
        }
        
    }catch (error) {
        console.error(error);
        return null;
    }

} 



export default deleteFetch