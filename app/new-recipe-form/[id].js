import { useState } from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { ScrollView, Text, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native';

import ImageHeaderButton from "../../components/buttons/ImageHeaderButton";
import AIGenerationForm from "./aiGenerateForm";
import StandardForm from "./standardForm";

const newRecipeForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const params = useGlobalSearchParams()
    const [generationForm, setGenerationForm] = useState(true)
    const [recipeData, setRecipeData] = useState(null)


    const handleSwitchForms = () => {
        setGenerationForm(!generationForm)
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
                headerTitle: "New Recipe",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>

            
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : <>
            <TouchableOpacity onPress={handleSwitchForms}
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
                            <Text style={{ textAlign: "center", padding: 10, backgroundColor: "green", color: "white", borderRadius: 15 }}>Switch Forms</Text>
                </TouchableOpacity>
                {generationForm ? 
                    <AIGenerationForm recipeData={recipeData} setRecipeData={setRecipeData} setIsLoading={setIsLoading} setGenerationForm={setGenerationForm} /> 
                    : 
                    <StandardForm recipeData={recipeData} params={params} setIsLoading={setIsLoading}/>
                }
                
                </>}
            </ScrollView>
        </SafeAreaView>
    )    

}

export default newRecipeForm