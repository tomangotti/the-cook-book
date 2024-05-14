import { useEffect, useState } from "react";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";

import Feed from "../components/Feed";
import checkToken from "../components/hooks/checkToken";
import MainMenu from "../components/menu/mainMenu";
import ImageHeaderButton from "../components/buttons/ImageHeaderButton";
import ProfileImageButton from "../components/buttons/ProfileImageButton";



const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false);
    
    const router = useRouter();

    async function checkLogin() {
        setIsLoading(true)
        
        let check = await checkToken(userId, setUserId)
        console.log(check)
        if(check === true){
            setLoggedIn(check)
        } else if(check === false){
            setLoggedIn(check)
        }

        setIsLoading(false)
    }
    
    
    useEffect(() => {
        checkLogin()
    },[loggedIn])

    
    if(isLoading === true){
        return(
            <ActivityIndicator size="large" color="blue" />
        )
    } else {
        return(
            <SafeAreaView style={{flex: 1}}>
            <Stack.Screen 
                options={{
                    headerShadowVisible: false,
                    headerStyle: {backgroundColor: "#FAFAFC"},
                    headerLeft: () => (
                        userId ?  
                        (<ImageHeaderButton imageTitle={"menu"} handlePress={() => setMenuVisible(!menuVisible)} />)
                        : <ScreenHeaderBtn title={"Log In"} dimension='100%' handlePress={() => router.push('/logIn/login-signup')} /> 
                    ),
                    headerRight: () => (
                        userId ?  
                        (<ProfileImageButton handlePress={() => router.push(`/profile-page/${userId}`)} />)
                        : null
                    ),
                    headerTitle: "Good Cook Book",
                    headerTitleAlign: "center",
                }}
            />
                {menuVisible ? <MainMenu userId={userId} /> : null}
                
                <Feed userId={userId} />
            </SafeAreaView>
        )
    }
}


export default Home