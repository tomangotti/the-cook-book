import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";


import Feed from "../components/Feed";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { useState } from "react";
import getToken from "../components/tokens/getToken";



const Home = () => {
    const router = useRouter();
    const {token, error, loggedIn,} = getToken();
    





    return(
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        <ScreenHeaderBtn title={"Saved Recipes"} dimension='75%' />
                    ),
                    headerRight: () => (
                        loggedIn ? 
                            <ScreenHeaderBtn title={"Profile"} dimension='100%' /> :
                            <ScreenHeaderBtn title={"Log in"} dimension='100%' handlePress={() => router.push('logIn/login-signup')}/>
                    ),
                    headerTitle: "The Good Cook Book",
                    headerTitleAlign: "center"
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Feed />
            </ScrollView>
            
        </SafeAreaView>
    )
}

export default Home