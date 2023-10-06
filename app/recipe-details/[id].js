import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleRecipe from "../../components/hooks/getSingleRecipe"
import RecipeDetailCard from "../../components/RecipeDetailCard";
import IngredientCard from "../../components/IngredientCard";
import { TouchableOpacity } from "react-native-gesture-handler";


const RecipeDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();

    const { data, isLoading, error, reFetch} = getSingleRecipe(params.id)


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
                    <IngredientCard item={item} />
                ))
                    
                )
                }
                </View>
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
                    <Button title="Save Recipe" style={{color: "blue"}}/>
                </TouchableOpacity>
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
                    <Button title="Add to Cart" />
                </TouchableOpacity>
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeDetails