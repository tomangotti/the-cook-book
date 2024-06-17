import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';


import getRecipesForCollection from '../../components/hooks/getRecipesForCollection';
import addRecipeToCollection from '../../components/hooks/addRecipeToCollection';


const SearchForRecipe = ({recipeIds, userId, collectionId, handleAddRecipeToCollection}) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const {data, isLoading, error} = getRecipesForCollection(userId);
    console.log(userId)

    useEffect(() => {
        setRecipes(data);
    },[data]);

    useEffect(() => {
        if(searchText === "") {
            setSearchResults([])
        } else {
            setSearchResults(recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase()) && !recipeIds.includes(recipe.id)))
        }
    },[searchText, recipeIds]);

    


    // const styles = {
    //     searchContainer: {},
    //     searchInput: {},
    //     searchResultsContainer: {},
    //     searchResult: {},
    // }

    const handleButtonPress = async (recipe) => {
        console.log("recipeId", recipe.id);
        console.log("collectionId", collectionId);
        const request = await addRecipeToCollection(collectionId, recipe.id);
        console.log("request", request);
        if(request === true){
            handleAddRecipeToCollection(recipe);
        }else{
            alert("Failed to add recipe to collection");
        }
    }



    return (
        <View >
            <View>
                <Text>Add New Recipe</Text>
                <TextInput
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    placeholder="Search for a recipe" 
                />
            </View>
            {isLoading ? 
                <Text>Loading...</Text> : 
                error ? (
                    <Text>Error: {error}</Text>
                ) :
                searchResults.length === 0 ? (
                    <Text>No results found</Text>
                ) :
            <View>
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Button title="Add" onPress={() => handleButtonPress(item)} />
                        </View>
                    )}
                /> 
            </View>}
        </View>
    )
}

export default SearchForRecipe;