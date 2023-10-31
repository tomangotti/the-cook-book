import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, {useState, useCallback} from "react";  
import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, RefreshControl } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import getCartItems from "../../components/hooks/getCartItems";
import CartRecipeCard from "../../components/cards/cartRecipeCard";
import IngredientCard from "../../components/IngredientCard";

const CartPage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const {data, isLoading, error, reFetch} = getCartItems(params.id)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        reFetch()
        setRefreshing(false)
    }, []);


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
            <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>

            <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                <Text style={{
                    fontSize: 24,
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
            <View style={{ marginTop: 10, alignItems: "center", backgroundColor: "lightgrey"}}>
                <Text style={{
                    fontSize: 24,
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