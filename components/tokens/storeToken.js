import AsyncStorage from '@react-native-async-storage/async-storage';


const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
    // Handle error
    }
};

export default storeToken