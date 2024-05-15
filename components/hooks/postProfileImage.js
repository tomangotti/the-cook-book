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


const postProfileImage = async (formData) => {
    
    const savedToken = await getToken();

    if (!savedToken) {
        setError("Token not found");
        return null;
    }

    try {
        const response = await fetch('https://mysite-p4xg.onrender.com/users/profile/image/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${savedToken}`, 
            },
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.log(response)
            throw new Error('Failed to save recipe.');
        }
    } catch (error) {
        console.error(error);
        return null;
    } 

}

export default postProfileImage;