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


// const Home = () => {
//     const [loggedIn, setLoggedIn] = useState(false)
//     const [userId, setUserId] = useState(null)
//     const [isLoading, setIsLoading] = useState(false)
    
//     async function checkLogin() {
//         let check = await checkToken(userId, setUserId)
//         if(check === true){
//             setLoggedIn(check)
//         } else if(check === false){
//             setLoggedIn(check)
//         }
//         setIsLoading(false)
//     }
    
    
//     useEffect(() => {
//         setIsLoading(true)
//         checkLogin()
        
//     },[loggedIn])

//     if(isLoading === true){
//         return(
//             <ActivityIndicator size="large" color="blue" />
//         )
//     }
//     if(loggedIn === false && userId === null){ 
//         return(
//             <LogInSignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
//         )
//     }else if(loggedIn === true && userId) {
//         return(
//             <Feed userId={userId} />
//         )
//     }
// }


// export default Home

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false);
    
    const router = useRouter();

    async function checkLogin() {
        setIsLoading(true)
        
        
        let check = await checkToken(userId, setUserId)

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