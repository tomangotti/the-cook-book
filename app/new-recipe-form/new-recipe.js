import react, { useState } from "react";
import { Stack, router, useRouter } from "expo-router";

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import { ScrollView, View, Text, TextInput, TouchableOpacity, SafeAreaView, Platform, Button, Image} from 'react-native';

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";


const newRecipeForm = () => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState([])
    const [image, setImage] = useState(null);
    const router = useRouter();


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
        setIngredients([...ingredients, { name: "", quantity: "", quantityType: "" }]);
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

    return (

        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: "New Recipe",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>

            
            <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
                <View>
                    <Text>Recipe Name</Text>
                    <TextInput  value={name} onChangeText={setName} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
                </View>
                <View>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <View>
                    <Text>Description</Text>
                    <TextInput  value={description} onChangeText={setDescription} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
                </View>
                <View>
                    <Text>Instructions</Text>
                    <TextInput  value={instructions} onChangeText={setInstructions} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
                </View>
                <View>
                    <Text>Ingredients</Text>
                    {ingredients.map((ingredient, index) => (
                        <View key={index} style={{marginTop: 15}}>
                            <TextInput
                                placeholder="Name"
                                value={ingredient.name}
                                onChangeText={(text) => updateIngredient(text, index, "name")}
                                style={{ backgroundColor: "lightgrey", width: 200 }}
                            />
                            <TextInput
                                placeholder="Quantity"
                                value={ingredient.quantity}
                                onChangeText={(text) => updateIngredient(text, index, "quantity")}
                                style={{ backgroundColor: "lightgrey", width: 200 }}
                            />
                            <TextInput
                                placeholder="Quantity Type"
                                value={ingredient.quantityType}
                                onChangeText={(text) => updateIngredient(text, index, "quantityType")}
                                style={{ backgroundColor: "lightgrey", width: 200 }}
                            />
                            <Button title="Remove" onPress={() => removeIngredient(index)} />
                        </View>
                    ))}
                    <Button title="Add Ingredient" onPress={addIngredient} />
                </View>
            </View>
            
            <TouchableOpacity 
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
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Add Recipe</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )    

}

export default newRecipeForm