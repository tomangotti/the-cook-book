import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    try {
        const savedToken = await AsyncStorage.getItem('authToken');
    if(savedToken) {
        return savedToken
    }else{
        return false
    }
    }catch{

    }
    
};

export default getToken