import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, {useState} from "react";  
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getCartItems from "../../components/hooks/getCartItems";
import CartRecipeCard from "../../components/cards/cartRecipeCard";
import IngredientCard from "../../components/IngredientCard";

const CartPage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();

    const {data, isLoading, error, reFetch} = getCartItems(params.id)

    return (
        <SafeAreaView>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: "#FAFAFC"},
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <ScreenHeaderBtn title={"back"} dimension="100%" handlePress={() => router.back()} />
                ),
                headerTitle: "Cart Items",
                headerTitleAlign: "center"
            }}/>
            <ScrollView showsVerticalScrollIndicator={false}>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12
            }}>
                <Text style={{
                    fontSize: 16,
                    color: "#312651",
                    alignItems: "center",
                }}>Your Cart Items</Text>
            </View>
            {isLoading ? (<ActivityIndicator size="large" /> ) : error ? (
                <View>
                    <Text>Something Went Wrong:</Text>
                    <Text>{error}</Text>
                    <TouchableOpacity onPress={reFetch}>
                        <Text>Retry</Text>
                    </TouchableOpacity>
                </View>) : (data?.map((item) => (
                <CartRecipeCard item={item} userId={params.id} reFetch={reFetch} key={item.id}/>
                ))
            )}
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12
            }}>
                <Text style={{
                    fontSize: 16,
                    color: "#312651",
                    alignItems: "center",
                }}>Your Ingredient List</Text>
            </View>
            {isLoading ? (<ActivityIndicator size="large" />) : error ? ( 
                <View>
                    <Text>Something Went Wrong:</Text>
                    <Text>{error}</Text>
                    <TouchableOpacity onPress={reFetch}>
                        <Text>Retry</Text>
                    </TouchableOpacity>
                </View>) : data?.map((recipe) => (
                    recipe.ingredients?.map((item) => (
                        <IngredientCard item={item} key={item.key}/>
                    ))
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}


export default CartPage