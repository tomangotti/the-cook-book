import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from "expo-router";


import getRecipes from '../../components/hooks/getRecipes';


const SearchRecipesCard = () => {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState('');
    const {data, isLoading, error} = getRecipes();
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    useEffect(() => {
        setRecipes(data)
    },[data])

    useEffect(() => {
        if(searchText === "") {
            setFilteredRecipes([])
        }
        else if (category === "All") {
            setFilteredRecipes(recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase())))
        } else {
            setFilteredRecipes(recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchText.toLowerCase()) && recipe.category === category))
        }
    },[recipes, searchText, category])

    const categoryOptions = [
        "All",
        "Breakfast",
        "Lunch",
        "Dinner",
        "Dessert",
        "Snack",
        "Appetizer",
        "Drink",
        "Other"
    ]

    function handlePress(id) {
        router.push(`/recipe-details/${id}`)
    } 

    return (
        <View>
            <View>
                <TextInput
                    placeholder="Search by Recipe name"
                    value={searchText}
                    style={{ backgroundColor: 'lightgrey', width: '75%', marginTop: 25, alignSelf: 'center', fontSize: 20 }}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>    
            
            <View style={{marginVertical: 15, alignSelf: "center"}}>
                <Text style={{fontSize: 18}}>Category</Text>
                <Picker selectedValue={category} onValueChange={setCategory} style={{backgroundColor: "lightgrey", width: 300}}>
                    {categoryOptions.map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                    ))}
                </Picker>
            </View>

            <View style={{marginVertical: 10}}>
                <Text style={{fontSize: 18, alignSelf: "center"}}>Results</Text>
            </View>

            
            {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : error ? (
                    <View>
                        <Text>Something Went Wrong:</Text>
                        <Text>{error}</Text>
                    </View>
                        ) : 
            <FlatList
                data={filteredRecipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item.id)} style={{marginHorizontal: 15, marginVertical:5, padding: 5, width: '75%', borderWidth: 1, borderColor: 'black', borderRadius: 5, alignSelf: "center"}}>
                    <Text style={{marginLeft: 10}}>{item.name} - by: {item.user_username}</Text>
                </TouchableOpacity>
                )}
            />
                }
        </View>
        
    )
}

export default SearchRecipesCard;