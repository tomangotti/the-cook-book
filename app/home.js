import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";


import Feed from "../components/Feed";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import { useEffect, useState } from "react";
import checkToken from "../components/hooks/checkToken";



const Home = () => {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    
    
   
    useEffect(() => {
        setLoggedIn(() => checkToken(userId, setUserId))
        console.log(userId)
    },[])
    




    return(
        <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        loggedIn ? 
                        <ScreenHeaderBtn title={"Saved Recipes"} dimension='75%' handlePress={() => router.push(`/saved-recipes/${userId}`)} /> :
                        null
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