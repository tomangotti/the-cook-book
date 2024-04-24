import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleRecipe from "../../components/hooks/getSingleRecipe"
import RecipeDetailCard from "../../components/RecipeDetailCard";
import IngredientCard from "../../components/IngredientCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import checkToken from "../../components/hooks/checkToken";

import BackImageHeaderButton from "../../components/buttons/BackImageHeaderButton";


const RecipeDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, reFetch} = getSingleRecipe(params.id)
    const [userId, setUserId] = useState(null)


    useEffect(() => {
        checkToken(userId, setUserId)
    },[])


    


    const checkOwner = () => {
        if(data.recipe && userId === data.recipe.user) {
            return true
        } else {
            return false
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
                        <BackImageHeaderButton handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        checkOwner() ? <ScreenHeaderBtn title={"Edit Recipe"} dimension="100%" handlePress={() => router.push(`/edit-recipe-form/${params.id}`)} /> : null
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
                        <RecipeDetailCard item={data.recipe} ingredients={data.ingredients} userId={userId} /> : null)
                }
                
                {/* <Text style={{fontSize: 24, alignSelf: "center"}}>Ingredients</Text>
                {isLoading ? (
                        <ActivityIndicator size="large" />
                    ) : error ? (
                        <View>
                            <Text>Something Went Wrong:</Text>
                        </View>
                    ) : ( data.ingredients?.map((item) => (
                            <IngredientCard item={item} recipeName={data.recipe.name} key={item.id} />
                        ))
                    )
                }*/}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeDetails