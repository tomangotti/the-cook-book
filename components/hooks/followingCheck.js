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

const followingCheck = (following_user_id) => {
    const [isFollowing, setIsFollowing] = useState(false)

    const getData =  async () => {
        const savedToken = await getToken();

        if (!savedToken) {
            return;
        }

        try {
            const response = await fetch(`https://mysite-p4xg.onrender.com/social/check/following/${following_user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${savedToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.is_following)
                setIsFollowing(data.is_following)
            } else {
                console.log(response.status)    
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return {isFollowing, setIsFollowing};
}

export default followingCheck;