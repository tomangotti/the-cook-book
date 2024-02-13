import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleCollection from "../../components/hooks/getSingleCollection";
import checkToken from "../../components/hooks/checkToken";
import CollectionCardDetails from "../../components/cards/collectionCardDetails";

const CollectionDetails = () => {
    const params = useGlobalSearchParams();
    const router = useRouter();
    const { data, isLoading, error, refetch} = getSingleCollection(params.id);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        checkToken(userId, setUserId)
    },[])

    const checkOwner = () => {
        if(data.user && userId === data.user) {
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
                        <ScreenHeaderBtn title={"<-- Back"} dimension="100%" handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        checkOwner() ? <ScreenHeaderBtn title={"Edit Recipe"} dimension="100%" handlePress={() => router.push(`/edit-collection-form/${params.id}`)} /> : null
                    ),
                    headerTitle: "Collection Details",
                    headerTitleAlign: "center"
                }}/>
            
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : error ? (
                    <View>
                        <Text>Something Went Wrong:</Text>
                        <Text>{error}</Text>
                        <Button title="Retry" onPress={refetch} />
                    </View>
                ) : data ? (
                    <CollectionCardDetails item={data} userId={userId} />
                ) :
                null}
            
        </SafeAreaView>
    )
}

export default CollectionDetails 