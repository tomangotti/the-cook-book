import AsyncStorage from '@react-native-async-storage/async-storage';


const storeToken = async (token) => {
    try {
        
        await AsyncStorage.setItem('authToken', token);
        console.log('token stored')
        
    } catch (error) {
    console.log("token not stored")
    }
    
};




export default storeToken;