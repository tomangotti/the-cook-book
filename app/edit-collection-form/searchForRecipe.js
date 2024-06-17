import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import getRecipesForCollection from '../../components/hooks/getRecipesForCollection';



const SearchForRecipe = ({recipeIds, userId}) => {
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const {data, isLoading, error} = getRecipesForCollection(userId);


    useEffect(() => {
        setRecipes(data);
    },[data]);

    useEffect(() => {
        if(searchText === "") {
            setSearchResults([])
        } else {
            setSearchResults(recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase())))
        }
    },[searchText]);

    


    // const styles = {
    //     searchContainer: {},
    //     searchInput: {},
    //     searchResultsContainer: {},
    //     searchResult: {},
    // }


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
                            <Button title="Add" onPress={() => {}} />
                        </View>
                    )}
                /> 
            </View>}
        </View>
    )
}

export default SearchForRecipe;