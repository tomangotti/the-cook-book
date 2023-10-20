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

import ButtonTemplate from "../../components/buttons/buttonTemplate";
import PostItemToCart from "../../components/hooks/postItemToCart";




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

    const handleAddToCart = async () => { 
        const item = {
            user: `${userId}`,
            recipe: `${data.recipe.id}`
        }
        

        const postFetch = await PostItemToCart(item)
        if (postFetch) {
            alert("item was added successfully.")
        } else {
            alert("item was not added.")
        }

    }

    const handleShareViewToggle = () => {
        setShareView(!shareView)
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
                <ButtonTemplate pressed={handleSave} color={buttonOptions() ? "red" : "blue"} title={buttonOptions() ? "Remove Recipe" : "Save Recipe"} /> 
                {checkUserID ? <ButtonTemplate title="Add to Cart" color="blue" pressed={handleAddToCart}/> : null}
                {shareView ? 
                    <View style={{alignItems: "center", backgroundColor: "lightgrey"}}>
                        <View style={{alignItems: "center", width: "80%", marginTop: 25}}>
                            <Text>Enter Recipients's Email</Text>
                            <TextInput value={shareEmail} onChangeText={setShareEmail} style={{backgroundColor: "white", width: 200}}></TextInput>
                            <ButtonTemplate color="green" title="Send" pressed={handleShareViewToggle} />
                        </View>
                        
                    </View>
                : null}
                <ButtonTemplate color={shareView ? "grey" : "green"} title={shareView ? "Hide Form" : "Share"} pressed={handleShareViewToggle}/>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeDetails