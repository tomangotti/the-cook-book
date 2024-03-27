import { useEffect, useState } from "react";
import React from "react";
import { ActivityIndicator } from "react-native";

import Feed from "../components/Feed";
import checkToken from "../components/hooks/checkToken";
import LogInSignUp from "./logIn/login-signup";


const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    async function checkLogin() {
        let check = await checkToken(userId, setUserId)
        if(check === true){
            setLoggedIn(check)
        } else if(check === false){
            setLoggedIn(check)
        }
    }
    
    useEffect(() => {
        setIsLoading(true)
        checkLogin()
        setIsLoading(false)
    },[loggedIn])

    if(isLoading === true){
        return(
            <ActivityIndicator size="large" color="blue" />
        )
    }
    if(loggedIn === false && userId === null){ 
        return(
            <LogInSignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )
    }else if(loggedIn === true && userId) {
        return(
            <Feed userId={userId} />
        )
    }
}


export default Home