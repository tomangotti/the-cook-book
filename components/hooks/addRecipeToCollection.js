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

const addRecipeToCollection = async (collectionId, recipeId) => {
    console.log("attemping to add recipe to collection")
    const savedToken = await getToken();

    if (!savedToken) {
        setError("Token not found");
        return null;
    }

    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/recipe-collections/add-recipe/${collectionId}/${recipeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `token ${savedToken}`, 
            },
        });

        if (response.ok) {
            return true;
        } else {
            console.log(response)
            throw new Error('Failed to save recipe.');
        }
    } catch (error) {
        console.error(error);
        return false;
    } 
}

export default addRecipeToCollection;