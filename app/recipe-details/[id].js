import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleRecipe from "../../components/hooks/getSingleRecipe"
import RecipeDetailCard from "../../components/RecipeDetailCard";
import IngredientCard from "../../components/IngredientCard";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import checkToken from "../../components/hooks/checkToken";
import SaveRecipe from "../../components/hooks/saveRecipe";


const RecipeDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, reFetch} = getSingleRecipe(params.id)
    const [userId, setUserId] = useState(null)
    const [shareView, setShareView] = useState(false)
    const [shareEmail, setShareEmail] = useState("")


    useEffect(() => {
        checkToken(userId, setUserId)
    },[])


    function buttonOptions() {
        if(data.users) {
            for(let i=0; i < data.users.length; i++) {  
                if(data.users[i].user === userId){
                    return true
                }
            }
            return false
        }
    }

    function checkUserID() {
        if(userId) {
            return true
        } else {
            return false
        }
    }
    

    const handleSave = async () => {
        console.log(buttonOptions())
        if(buttonOptions() === false) {
            const save = await SaveRecipe(userId, data.recipe.id, "POST")
            save ? router.back() : alert("item was not saved successfully")
        } else {
            const remove = await SaveRecipe(userId, data.recipe.id, "DELETE")
            remove ? router.back() : alert("item was not removed successfully") 
        }
    }




    return(
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerTitle: "Recipe Details",
                    headerTitleAlign: "center"
                }}/>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                {isLoading ? (
                        <ActivityIndicator size="large" />
                    ) : error ? (
                        <View>
                            <Text>Something Went Wrong:</Text>
                            <Text>{error}</Text>
                            <TouchableOpacity onPress={reFetch}>
                                <Text>Retry</Text>
                            </TouchableOpacity>
                        </View>
                    ) : ( data.recipe ? 
                        <RecipeDetailCard item={data.recipe} /> : null)
                }
                <Text style={{fontSize: 24, alignSelf: "center"}}>Ingredients</Text>
                {isLoading ? (
                        <ActivityIndicator size="large" />
                    ) : error ? (
                        <View>
                            <Text>Something Went Wrong:</Text>
                        </View>
                    ) : ( data.ingredients?.map((item) => (
                            <IngredientCard item={item} key={item.id} />
                        ))
                    )
                }
                </View>
                <TouchableOpacity onPress={handleSave} style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 15,
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
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: buttonOptions() ? "red" : "blue", color: "white", borderRadius: 15 }}>{buttonOptions() ? "Remove Recipe" : "Save Recipe"}</Text>
                </TouchableOpacity>
                {checkUserID ? 
                    <TouchableOpacity style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 15,
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
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Add to Cart</Text>
                    </TouchableOpacity> : null}

                    {shareView ? 
                        <View>
                            <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
                                <Text>Enter Recipients's Email</Text>
                                <TextInput value={shareEmail} onChangeText={setShareEmail} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
                            </View>
                            <TouchableOpacity onPress={() => setShareView(!shareView)} style={{
                                width: "50%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: 15,
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
                                <Text style={{ textAlign: "center", padding: 10, backgroundColor: "green", color: "white", borderRadius: 15 }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                    <TouchableOpacity onPress={() => setShareView(!shareView)} style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 15,
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
                        <Text style={{ textAlign: "center", padding: 10, backgroundColor: shareView ? "grey" : "green", color: "white", borderRadius: 15 }}>{shareView ? "Hide Form" : "Share"}</Text>
                    </TouchableOpacity>
                    
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeDetails