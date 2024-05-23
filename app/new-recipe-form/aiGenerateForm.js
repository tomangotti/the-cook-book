import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AIGenerationForm = ({recipeData, setRecipeData, setIsLoading, setGenerationForm}) => {
    const [message, setMessage] = useState("")

    const handleGenerateRecipe = async () => {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('authToken');
        
        await fetch('https://mysite-p4xg.onrender.com/recipes/generate/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`

            },
            body: JSON.stringify({message: message})
        })
        .then(response => response.json())
        .then(data => {
            generatedRecipe = JSON.parse(data.recipe)

            if(generatedRecipe.recipe){
                setRecipeData(generatedRecipe.recipe)
            } else{
                setRecipeData(generatedRecipe)
            }
        })
        .catch((error) => {
            alert('failed to generate recipe. try again later')
            console.error('Error:', error);
        });
        setGenerationForm(false)
        setIsLoading(false)
    }


    return (<View>
        <View style={{margin: 5}}>
                            <Text style={{fontSize: 18}}>Enter all Recipe Info here and it will auto fill out form</Text>
                            <TextInput  multiline={true} numberOfLines={6} value={message} onChangeText={setMessage} style={{backgroundColor: "lightgrey", width: 300}}></TextInput>
                </View>
                <TouchableOpacity onPress={handleGenerateRecipe}
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
                            <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Generate</Text>
                </TouchableOpacity>
        </View>
    )
}

export default AIGenerationForm;