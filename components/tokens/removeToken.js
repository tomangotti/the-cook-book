import AsyncStorage from '@react-native-async-storage/async-storage';


const removeToken = async () => {
    console.log('attempting to log out')
    await AsyncStorage.removeItem('authToken');
    console.log('Token removed');
    return true;

};

export default removeToken