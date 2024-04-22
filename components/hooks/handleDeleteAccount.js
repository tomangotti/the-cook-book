
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

const HandleDeleteAccount = async () => {

    const savedToken = await getToken();

    if (!savedToken) {
        console.log("Token not found");
        return false;
    }

    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/users/delete/account`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${savedToken}`,
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            return true;
        } else {
            console.log(response.status);
            console.log("Update failed");
            return false;
        }
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
};


export default HandleDeleteAccount;