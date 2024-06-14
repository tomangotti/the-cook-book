import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import getRecipesForCollection from '../../components/hooks/getRecipesForCollection';


const SearchForRecipe = ({recipeIds}) => {
    const [searchText, setSearchText] = useState('');
    const {data, isLoading, error} = getRecipesForCollection();

    


    // const styles = {
    //     searchContainer: {},
    //     searchInput: {},
    //     searchResultsContainer: {},
    //     searchResult: {},
    // }


    return (
        <View >
            {isLoading ? null : <><View>
                <Text>Add New Recipe</Text>
                <TextInput
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search for a recipe" 
                />
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.name}</Text>
                            <Button title="Add" onPress={() => {}} />
                        </View>
                    )}
                /> 
            </View>
            </>}
        </View>
    )
}

export default SearchForRecipe;