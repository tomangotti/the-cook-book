import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack, router, useGlobalSearchParams, useRouter } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import getUsersRecipes from "../../components/hooks/getUsersRecipes";
import getFavoriteRecipes from "../../components/hooks/getFavoriteRecipes";
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";


const CreateCollectionForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams()

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState([]);

    const { userRecipes, recipesIsLoading, recipeError, reFetchRecipes } = getUsersRecipes(params.id);
    const { favoriteRecipes, favRecipesIsLoading, favRecipesError, reFetchFavRecipes} = getFavoriteRecipes(params.id);
    


    const handleRecipeSelection = (recipeId) => {
        if (selectedRecipes.includes(recipeId)) {
            setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
        } else {
            setSelectedRecipes([...selectedRecipes, recipeId]);
        }
    };

    const handleCreateCollection = () => {
        // Perform the logic to create the collection using the name, description, and selectedRecipes
        // You can make an API call or update the state accordingly
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Selected Recipes:", selectedRecipes);
    };

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: "New Collection",
                headerTitleAlign: "center"
            }} />
            
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                backgroundColor: 'white',
                borderBlockColor: 'white',
                borderRadius: 15,
                padding: 15,
                marginHorizontal: 15,
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                shadowOpacity: 0.25,
                shadowRadius: 5.84,
                elevation: 5,
                }}>
                <View style={{alignItems: "center", width: "100%"}} >
                    <View style={{margin: 5}}>
                        <Text style={{fontSize: 18}}>Collection Name</Text>
                        <TextInput
                            style={{backgroundColor: "lightgrey", width: 300}}
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                        />
                    </View> 
                    <View style={{margin: 5}}>
                        <Text style={{fontSize: 18}}>Description</Text>
                        <TextInput
                            style={{backgroundColor: "lightgrey", width: 300}}
                            multiline={true} numberOfLines={6}
                            placeholder="Description"
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>
                </View>
                <View style={{margin: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>Your Recipes</Text>
                    <FlatList
                        data={userRecipes}
                        contentContainerStyle={{
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            
                                <BouncyCheckbox
                                    size={30}
                                    fillColor="blue"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "blue" }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    onPress={() => handleRecipeSelection(item.id)}
                                    text={item.name}
                                />
                            
                        )}
                    /> 
                </View>
                <View style={{margin: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 16}}>Favorite Recipes</Text>
                    <FlatList
                        data={favoriteRecipes}
                        contentContainerStyle={{
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                        }}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                                <BouncyCheckbox
                                    size={30}
                                    fillColor="blue"
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: "blue" }}
                                    innerIconStyle={{ borderWidth: 2 }}
                                    text={item.recipe.name}
                                    onPress={()=> handleRecipeSelection(item.recipe.id)}
                                />
                            
                        )}
                    />
                </View>
                
                
            </View>
            <TouchableOpacity onPress={handleCreateCollection}
                    style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 45,
                        marginBottom: 15,
                        borderRadius: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                        shadowOpacity: 0.25,
                        shadowRadius: 5.84,
                        elevation: 5,
                }}>
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Create Collection</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};
    



export default CreateCollectionForm;
