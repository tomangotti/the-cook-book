import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useCallback, useState } from "react";

import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";


import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getUserSavedRecipes from "../../components/hooks/getUserSavedRecipes";
import RecipeCard from "../../components/RecipeCard";
import ButtonTemplate from "../../components/buttons/buttonTemplate";


const SavedRecipePage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const {data, isLoading, error, reFetch} = getUserSavedRecipes(params.id)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch()
        setRefreshing(false)
    }, []);


    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerTitle: "Saved Recipes",
                    headerTitleAlign: "center"
                }}/>
                
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                    <View style={{margin: 24}}>
                        <ButtonTemplate title="Add New Recipe" color="blue" pressed={()=>{router.push(`/new-recipe-form/${params.id}`, {userId: params.id})}} />
                        <ButtonTemplate title="View Cart" color="green" pressed={()=>{router.push(`/user-cart-page/${params.id}`)}} />

                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 12,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                color: "#312651",
                            }}>Your Recipes</Text>
                        </View>

                        <View style={{
                            marginTop: 16,
                            gap: 12, 
                            alignItems: "center",
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