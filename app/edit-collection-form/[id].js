
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Stack, router, useGlobalSearchParams, useRouter } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import getUsersRecipes from "../../components/hooks/getUsersRecipes";
import getFavoriteRecipes from "../../components/hooks/getFavoriteRecipes";
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getSingleCollection from '../../components/hooks/getSingleCollection';
import checkToken from '../../components/hooks/checkToken';
import deleteCollection from '../../components/hooks/deleteCollection';


const EditCollectionForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams()
    const { data, isLoading, error, refetch} = getSingleCollection(params.id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [userId, setUserId] = useState(null)

    // const { userRecipes, recipesIsLoading, recipeError, reFetchRecipes } = getUsersRecipes(userId);
    // const { favoriteRecipes, favRecipesIsLoading, favRecipesError, reFetchFavRecipes} = getFavoriteRecipes(userId);
    


    // useEffect(() => {
    //     checkToken(userId, setUserId)
    // },[])
    
    

    
    useEffect(() => {
        if(data) {
            setName(data.name);
            setDescription(data.description);
            setSelectedRecipes(data.recipes);
        }
    },[data])

    const handleRecipeSelection = (recipeId) => {
        if (selectedRecipes.includes(recipeId)) {
            setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
        } else {
            setSelectedRecipes([...selectedRecipes, recipeId]);
        }
    };

    const handleSaveCollection = async () => {
        const collection = {
            name: name,
            user: params.id,
            description: description,
            recipes: selectedRecipes
        }
        
        console.log(collection);
        // const response = await postNewCollection(collection, params.id);
        // if(!response) {
        //     alert('error saving collection')
        // } else {
        //     router.push(`/your-recipes/${params.id}`)
        // }
    };

    const handleShowDelete = () => {
        setShowDelete(!showDelete);
    }

    const handleDeleteCollection = async () => {
        console.log("deleting collection")
        const response = await deleteCollection(params.id);
        if(response) {
            router.push(`/home`)
        } else {
            alert('error deleting collection')
        }
    }

    const deleteButton = () => {
        return(
            <TouchableOpacity onPress={handleDeleteCollection}
                    style={{
                        width: "70%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 5,
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
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: "red", color: "white", borderRadius: 15 }}>Confirm Delete</Text>
                </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: "Edit Collection",
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
                {/* <View style={{margin: 10}}>
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
                                    textStyle={{
                                        textDecorationLine: "none",
                                    }}
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
                </View> */}
                
                
            </View>
            <TouchableOpacity onPress={handleSaveCollection}
                    style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 35,
                        marginBottom: 10,
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
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Save Collection</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleShowDelete}
                    style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 5,
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
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: showDelete ? "grey" : "red", color: "white", borderRadius: 15 }}>{showDelete ? "Cancel": "Delete"}</Text>
                </TouchableOpacity>
                {showDelete ? deleteButton() : null}
            </ScrollView>
        </SafeAreaView>
    );
};
    



export default EditCollectionForm;
