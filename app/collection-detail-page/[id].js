import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";


import checkToken from "../../components/hooks/checkToken";

const CollectionDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, refetch} = null;
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        checkToken(userId, setUserId)
    },[])

    return(
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerTitle: "Collection Details",
                    headerTitleAlign: "center"
                }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>{}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}