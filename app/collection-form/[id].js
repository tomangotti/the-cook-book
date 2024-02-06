import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, ScrollView } from 'react-native';
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
            <View>
                <TextInput
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <FlatList
                    data={userRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            margin: 10
                        }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="red"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                onPress={() => handleRecipeSelection(item.id)}
                                text={item.name}
                            />
                            
                        </View>
                    )}
                />
                <FlatList
                    data={favoriteRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{
                            margin: 10
                        }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor="red"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "red" }}
                                innerIconStyle={{ borderWidth: 2 }}
                                text={item.recipe.name}
                                onPress={()=> handleRecipeSelection(item.recipe.id)}
                            />
                            
                        </View>
                    )}
                />
                <Button
                    title="Create Collection"
                    onPress={handleCreateCollection}
                />
            </View>
            </ScrollView>
        </SafeAreaView>
    );
};
    



export default CreateCollectionForm;
