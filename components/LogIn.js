import React from "react";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import { Button } from "react-native";



const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    
    return (
        <View>
            <View>
                <Text>Email</Text>
                <TextInput  value={email} onChangeText={setEmail}></TextInput>
            </View>
            <View>
                <Text>Password</Text>
                <TextInput  value={password} onChangeText={setPassword}></TextInput>
            </View>
            <View>
                <TouchableOpacity onPress={() => null} style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginTop: 15,
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
                    <Button title="Log In" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Login