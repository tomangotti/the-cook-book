import { useEffect, useState } from "react";

import Feed from "../components/Feed";
import checkToken from "../components/hooks/checkToken";
import LogInSignUp from "./logIn/login-signup";




const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(null)
    
    async function checkLogin() {
        let check = await checkToken(userId, setUserId)
        if(check === true){
            setLoggedIn(check)
        } else if(check === false){
            setLoggedIn(check)
        }
    }
        
    checkLogin()
    
    if(loggedIn === false) {
        return(
            <LogInSignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )
    }else if(loggedIn === true) {
        return(
            <Feed userId={userId} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        )
    }
}

export default Home