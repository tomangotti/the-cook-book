import react, { useEffect, useState } from "react";
import { Stack, router, useGlobalSearchParams, useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { ScrollView, View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, Button, Image} from 'react-native';

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import editRecipe from "../../components/hooks/editRecipe";
import getSingleRecipe from "../../components/hooks/getSingleRecipe";
import ButtonTemplate from "../../components/buttons/buttonTemplate";


const editRecipeForm = () => {
    const router = useRouter();
    const params = useGlobalSearchParams()
    const { data, isLoading, error, reFetch} = getSingleRecipe(params.id)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [image, setImage] = useState(null);
    const [deleteStatus, setDeleteStatus] = useState(false)

    useEffect(()=> {
        if(data.recipe) {
            setName(data.recipe.name)
            setDescription(data.recipe.description)
            setInstructions(data.recipe.instructions)
            setIngredients(data.recipe.ingredients)
        }
    },[data])

    

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", quantity: "", quantity_type: "" }]);
    };

    const updateIngredient = (text, index, field) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = text;
        setIngredients(updatedIngredients);
    };

    const removeIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const getToken = async () => {
        try {
            const savedToken = await AsyncStorage.getItem('authToken');
            
            if (savedToken) {
                return savedToken;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
            return false;
        }
    };

    const handleEdit = async () => {
        const formData = new FormData();


        if (image) {
            const imageUri = image; 
            const uriParts = imageUri.split(".");
            const fileType = uriParts[uriParts.length - 1];
            formData.append("image", {
                uri: imageUri,
                name: `image.${fileType}`,
                type: `image/${fileType}`,
            });
        }
        

        formData.append("name", name);
        formData.append("description", description);
        formData.append("instructions", instructions);

        const ingredientsJSON = JSON.stringify(ingredients)
        formData.append("ingredients", ingredientsJSON);
        const token = await getToken();

        const sendData = await editRecipe(formData, token, params.id)
        if(!sendData) {
            alert("error saving recipe. try again")
        } else {
            router.replace(`/recipe-details/${params.id}`)
        }
    }


    const handleDelete = async () => {
        console.log("delete")
    }

    const updateDeleteStatus = () => {
        setDeleteStatus(!deleteStatus)
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
                headerTitle: "Edit Recipe",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>

            
            <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}} >Recipe Name</Text>
                    <TextInput value={name}  onChangeText={setName} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{margin: 5}}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Description</Text>
                    <TextInput  multiline={true} numberOfLines={6} value={description} onChangeText={setDescription} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Instructions</Text>
                    <TextInput   multiline={true} numberOfLines={16} value={instructions} onChangeText={setInstructions} style={{backgroundColor: "lightgrey", width: 250}}></TextInput>
                </View>
                <View style={{margin: 5}}>
                    <Text style={{fontSize: 18}}>Ingredients</Text>
                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={{margin: 15}}>
                            <TextInput
                                placeholder="Name"
                                value={ingredient.name}
                                onChangeText={(text) => updateIngredient(text, index, "name")}
                                style={{ backgroundColor: "lightgrey", width: 200, marginTop: 5 }}
                            />
                            <TextInput
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChangeText={(text) => updateIngredient(text, index, "quantity")}
                                style={{ backgroundColor: "lightgrey", width: 200, marginTop: 5 }}
                            />
                            <TextInput
                                placeholder="Quantity Type"
                                value={ingredient.quantity_type}
                                onChangeText={(text) => updateIngredient(text, index, "quantity_type")}
                                style={{ backgroundColor: "lightgrey", width: 200, marginTop: 5 }}
                            />
                            <Button title="Remove" onPress={() => removeIngredient(index)} />
                        </View>
                    ))}
                    <Button title="Add Ingredient" onPress={addIngredient} />
                </View>
            </View>
            <View>
                <ButtonTemplate title="Update Recipe" pressed={handleEdit} color="blue" />
                {deleteStatus ? <View style={{width: "50%", alignSelf: "center"}}><Text style={{alignSelf: "center"}}>Are you sure?</Text><ButtonTemplate title="Confirm Delete" pressed={handleDelete} color="red" /></View> : null}
                <ButtonTemplate title={!deleteStatus ? "Delete Recipe" : "Cancel"} pressed={updateDeleteStatus} color={deleteStatus ? "grey" : "red"} />
            </View>
                
                
            </ScrollView>
        </SafeAreaView>
    )    

}

export default editRecipeForm