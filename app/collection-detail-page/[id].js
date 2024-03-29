import { Stack, useGlobalSearchParams, useRouter } from "expo-router";
import react, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";

import getSingleCollection from "../../components/hooks/getSingleCollection";
import checkToken from "../../components/hooks/checkToken";
import CollectionCardDetails from "../../components/cards/collectionCardDetails";
import BackImageHeaderButton from "../../components/buttons/BackImageHeaderButton";

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
                        
                    <BackImageHeaderButton handlePress={() => router.back()} />
                    ),
                    headerRight: () => (
                        checkOwner() ? <ScreenHeaderBtn title={"Edit Collection"} dimension="100%" handlePress={() => router.push(`/edit-collection-form/${params.id}`)} /> : null
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
                    <ScrollView showsVerticalScrollIndicator={false} >
                    <CollectionCardDetails item={data} userId={userId} />
                    </ScrollView>
                ) :
                null}
            
        </SafeAreaView>
    )
}

export default CollectionDetails 