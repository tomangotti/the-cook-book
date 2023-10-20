import React, { useEffect } from "react";
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

const EditUserInfo = async (newInfo) => {

    const savedToken = await getToken();

    if (!savedToken) {
        console.log("Token not found");
        return false;
    }

    try {
        const response = await fetch(`http://10.0.0.106:8000/users/${newInfo.id}/update`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${savedToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newInfo)
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return true;
        } else {
            console.log(response.status);
            console.log("Update failed");
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};


export default EditUserInfo;