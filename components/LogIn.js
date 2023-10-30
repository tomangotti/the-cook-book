import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Button } from "react-native";
import postLogin from "./hooks/postLogin";
import { router, useRouter } from "expo-router";
import ButtonTemplate from "./buttons/buttonTemplate";


const Login = ({loggedIn, setLoggedIn}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    async function handleLogin() {
        const attempt = await postLogin({
            'username': username,
            'password': password
        });
        if(attempt === true) {
            setLoggedIn(attempt);
            // router.push('/home')
        } else if(attempt === false) {
            alert("Login failed, try again");
            setLoggedIn(attempt)
        }
    }

    return (
        <View style={{alignItems: "center", width: "100%", marginTop: 25}}>
            <View>
                <Text>username</Text>
                <TextInput  value={username} onChangeText={setUsername} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput  value={password} onChangeText={setPassword} style={{backgroundColor: "lightgrey", width: 200}}></TextInput>
            </View>
            <View style={{width: "80%", margin:15}}>
                <ButtonTemplate title="Login" color="blue" pressed={handleLogin} />
            </View>
        </View>
    )
}


export default Login