import react from "react";
import { Stack, useGlobalSearchParams, useRouter } from "expo-router";

import { SafeAreaView, Text, View, ScrollView, ActivityIndicator, RefreshControl, Image, Button } from "react-native";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";


const profileHome = () => {
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
                    headerTitle: "Profile Details",
                    headerTitleAlign: "center"
                }}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <Text>Hello, INSERT NAME</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default profileHome