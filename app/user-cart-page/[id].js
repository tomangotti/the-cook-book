import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react from "react";  
import { SafeAreaView, ScrollView, View, Text } from "react-native";

import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";


const CartPage = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();



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
                    color: "#312651"
                }}>Your Cart Items</Text>
            </View>
            

            </ScrollView>
        </SafeAreaView>
    )
}


export default CartPage