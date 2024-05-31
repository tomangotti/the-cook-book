import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,} from 'react-native';
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

    const style = {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF',
            width: '100%',
            marginHorizontal: 'auto',

        },
        instructions: {
            textAlign: 'center',
            color: '#333333',
            marginBottom: 5,
            width: "80%",
        },
        input: {
            height: 250,
            borderColor: 'gray',
            borderWidth: 1,
            width: "80%",
            marginBottom: 20,
            backgroundColor: "lightgrey",
        },
        buttonGen: {
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
        },
        buttonText: {
            textAlign: "center",
            padding: 10,
            backgroundColor: "blue",
            color: "white",
            borderRadius: 15
        }
    }


    return (<View>
                <View style={style.container}>
                            <Text style={style.instructions}>Enter All Recipe Info here</Text>
                            <Text style={style.instructions}>The AI will auto sort the data</Text>
                            <Text style={style.instructions}>On the next page you will be able to edit info prior to saving recipe</Text>
                            <TextInput  multiline={true} numberOfLines={6} value={message} onChangeText={setMessage} style={style.input}></TextInput>
                            
                    <TouchableOpacity onPress={handleGenerateRecipe} style={style.buttonGen}>
                                <Text style={style.buttonText}>Generate</Text>
                    </TouchableOpacity>
                </View>
        </View>
    )
}

export default AIGenerationForm;