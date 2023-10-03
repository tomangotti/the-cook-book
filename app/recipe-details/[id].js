import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleRecipe from "../../components/hooks/getSingleRecipe"

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
                    headerRight: () => (
                        <ScreenHeaderBtn title={"Add to Cart"} dimension="100%"  />
                    ),
                    headerTitle: data.recipe ? data.recipe.name : "loading",
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
                ) : ( data.recipe ? <Text>{data.recipe.name}</Text> : null)
                }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RecipeDetails