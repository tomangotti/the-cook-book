import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import storeToken from './storeToken';
import checkToken from '../hooks/checkToken';

const getToken = async () => {
    const [token, setToken] = useState("")
    const [error, setError] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)

    try {
        const savedToken = await AsyncStorage.getItem('authToken');
        checkToken(savedToken, token, setToken, loggedIn, setLoggedIn)
        
    } catch (error) {
        setError(err.message)
        setLoggedIn(false)
    }
        
    


    return {token, error, loggedIn};
};

export default getToken