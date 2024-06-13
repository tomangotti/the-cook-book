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

const removeRecipeFromCollection = async (collectionId, recipeId) => {

    const savedToken = await getToken();

    if (!savedToken) {
        setError("Token not found");
        return null;
    }

    try {
        const response = await fetch(`https://mysite-p4xg.onrender.com/recipe-collections/remove-recipe/${collectionId}/${recipeId}`, {
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

export default removeRecipeFromCollection;