
import React, { useState, useEffect } from 'react';
import {ScrollView, Text, TouchableOpacity, View, TextInput, FlatList  } from 'react-native';
import { Stack,useGlobalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';

import getSingleCollection from '../../components/hooks/getSingleCollection';
import deleteCollection from '../../components/hooks/deleteCollection';
import ImageHeaderButton from '../../components/buttons/ImageHeaderButton';
import removeRecipeFromCollection from '../../components/hooks/removeRecipeFromCollection';
import SearchForRecipe from './searchForRecipe';

const EditCollectionForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams()
    const { data, isLoading, error, refetch} = getSingleCollection(params.id);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRecipes, setSelectedRecipes] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [recipesIds, setRecipesIds] = useState([])
    
    
    useEffect(() => {
        if(data) {
            console.log(data.user)
            setName(data.name);
            setDescription(data.description);
            setSelectedRecipes(data.recipes_details);
            setRecipesIds(data.recipes)
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

    const handleRemoveRecipe = async (recipeId) => {
        const response = await removeRecipeFromCollection(params.id ,recipeId);
        if(response) {
            setSelectedRecipes(selectedRecipes.filter(recipe => recipe.id !== recipeId));
        } else {
            alert('error removing recipe')
        }
    }

    const handleAddRecipeToCollection = (recipe) => {
        setSelectedRecipes([...selectedRecipes, recipe]);
        setRecipesIds([...recipesIds, recipe.id])
    }

    const editFormBody = () => {
        return(
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
                    <View>
                        <Text style={{fontSize: 18, textAlign: "center", marginTop: 10}}>Recipes</Text>
                        <FlatList 
                            data={selectedRecipes}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <View 
                                    style={{
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: 5,
                                        flexDirection: "row",
                                        borderRadius: 12,
                                        backgroundColor: "#F3F4F8",
                                        width: "85%",
                                        marginTop: 10,
                                        marginBottom: 5,
                                        marginLeft: "auto",
                                        marginRight: "auto",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                            },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 5.84,
                                        elevation: 5,
                                    }}>
                                    <Text style={{alignSelf: "center"}}>{item.name}</Text>
                                    <TouchableOpacity
                                        onPress={() => handleRemoveRecipe(item.id)}
                                        style={{
                                            width: "25%",
                                            marginRight: 5,
                                            marginTop: 5,
                                            marginBottom: 5,
                                            borderRadius: 15,
                                            backgroundColor: "red"
                                        }}
                                    >
                                        <Text style={{ textAlign: "center", padding: 7.5,  color: "white", borderRadius: 15, fontSize: 12}}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </View>
                    <View>
                        {data.user != undefined ? <SearchForRecipe recipeIds={recipesIds} userId={data.user} collectionId={params.id} handleAddRecipeToCollection={handleAddRecipeToCollection} /> : null}
                    </View>
            </View>
        )
    }



    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ImageHeaderButton imageTitle={"back"} handlePress={() => router.back()} />
                ),
                headerTitle: "Edit Collection",
                headerTitleAlign: "center"
            }} />
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {isLoading ? <Text>Loading...</Text> : editFormBody()}
            
                <View style={{alignItems: "center", marginVertical: 15}}>
                    <TouchableOpacity onPress={handleSaveCollection}
                        style={{
                            width: "80%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginVertical: 5,
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
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: "green", borderRadius: 15, color: "white" }}>Save Collection</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleShowDelete}
                        style={{
                            width: "80%",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginVertical: 5,
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
                </View>
                {showDelete ? deleteButton() : null}
            </ScrollView>
        </SafeAreaView>
    );
};
    



export default EditCollectionForm;
