import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect } from "react";

import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";


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
                    headerTitle: "Saved Recipes",
                    headerTitleAlign: "center"
                }}/>
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