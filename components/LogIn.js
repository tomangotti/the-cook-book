import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Button } from "react-native";
import postLogin from "./hooks/postLogin";
import { router, useRouter } from "expo-router";



const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    



    async function handleLogin() {
        const attempt = await postLogin({
            'username': username,
            'password': password
        });
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
            
                <TouchableOpacity 
                    onPress={handleLogin} 
                    style={{
                        width: "80%",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: 45,
                        marginBottom: 15,
                        borderRadius: 15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                            },
                        shadowOpacity: 0.25,
                        shadowRadius: 5.84,
                        elevation: 5,
                }}>
                    <Text style={{ textAlign: "center", padding: 10, backgroundColor: "blue", color: "white", borderRadius: 15 }}>Log In</Text>
                </TouchableOpacity>
            
        </View>
    )
}


export default Login