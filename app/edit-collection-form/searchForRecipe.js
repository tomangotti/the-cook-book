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

    const styles = {
        searchContainer: {
            padding: 10,
            backgroundColor: 'white',
            alignItems: 'center',
        },
        searchTitle:{
            fontSize: 20,
            marginBottom: 10,
        },
        searchInput: {
            width: '90%',
            padding: 10,
            backgroundColor: 'lightgrey',
            borderRadius: 5,
        },
        searchResultsContainer: {
            padding: 10,
            backgroundColor: 'white',
        },
        searchResult: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: "center",
            marginVertical: 7,
            borderRadius: 5,
            paddingLeft: 10,
            paddingTop: 0,
            borderWidth: 1,
            borderColor: 'lightgrey',
            backgroundColor: '#F3F4F8',
        },
        resultTitle: {
            fontSize: 16,
            justifyContent: 'center',
        },
        resultButton:{
            backgroundColor: 'lightblue',
            padding: 5,
            borderRadius: 5,
            fontSize: 16,
        },
        defaultResultTitle:{
            textAlign: "center",
        }
    }



    return (
        <View>
            <View style={styles.searchContainer}>
                <Text style={styles.searchTitle}>Add New Recipe</Text>
                <TextInput
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    placeholder="Search for a recipe"
                    style={styles.searchInput} 
                />
            </View>
            {isLoading ? (
                <View> 
                    <Text styles={styles.defaultResultTitle}>Loading...</Text>
                </View>
                ) : 
                error ? (
                    <View>
                        <Text styles={styles.defaultResultTitle}>Error: {error}</Text>
                    </View>
                ) :
                searchText === "" ? (
                    <View>
                        <Text style={styles.defaultResultTitle}>Start typing to search</Text>
                    </View>
                ) :
                searchResults.length === 0 ? (
                    <View>
                        <Text style={styles.defaultResultTitle}>No results found</Text>
                    </View>
                ) : 
            <View style={styles.searchResultsContainer}>
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.searchResult} >
                            <Text style={styles.resultTitle} >{item.name}</Text>
                            <Button style={styles.resultButton} title="Add" onPress={() => handleButtonPress(item)} />
                        </View>
                    )}
                /> 
            </View>}
        </View>
    )
}

export default SearchForRecipe;