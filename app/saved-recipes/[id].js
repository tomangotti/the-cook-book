import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect } from "react";

import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";


import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getUserSavedRecipes from "../../components/hooks/getUserSavedRecipes";
import RecipeCard from "../../components/RecipeCard";


const SavedRecipePage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();

    const {data, isLoading, error, reFetch} = getUserSavedRecipes(params.id)



    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn title={"Cart"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerTitle: "Saved Recipes",
                    headerTitleAlign: "center"
                }}/>
                <TouchableOpacity onPress={() => router.push(`/new-recipe-form/${params.id}`, {userId: params.id})} style={{
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
                        <Text style={{ 
                            textAlign: "center", 
                            padding: 10, 
                            backgroundColor: "blue", 
                            color: "white", 
                            borderRadius: 15 
                            }}>Add NEW Recipe</Text>
                    </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{margin: 24}}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 12
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: "#312651"
                            }}>Your Recipes</Text>
                        </View>
                        <View style={{
                            marginTop: 16,
                            gap: 12
                        }}>
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
                            ) : ( data?.map((item) => (
                                    <RecipeCard item={item} key={item.id} handleNavigate={() => router.push(`/recipe-details/${item.id}`)}/> 
                                ))
                            )}
                        </View>
                    </View>
                </ScrollView>
        </SafeAreaView>
    )
}

export default SavedRecipePage